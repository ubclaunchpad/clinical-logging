import json
import os
from PIL import Image
import ollama
import subprocess
import time
import re


def ensure_gpu_ollama():
    """Ensure Ollama is running with GPU support"""
    try:
        # Set environment variable for GPU
        os.environ['CUDA_VISIBLE_DEVICES'] = '0'  # Use first GPU
        
        # Check if Ollama is running and restart it
        try:
            subprocess.run(['ollama', 'serve', 'stop'], check=False)
        except:
            pass  # Ignore errors if service isn't running
            
        # Wait a moment for the service to stop
        time.sleep(2)
        
        # Start Ollama with GPU support
        try:
            subprocess.Popen(['ollama', 'serve'])
            time.sleep(2)  # Give it time to start
            print("Ollama restarted with GPU support")
        except Exception as e:
            print(f"Warning: Could not start Ollama service: {e}")
            
    except Exception as e:
        print(f"Warning: Could not configure GPU for Ollama: {e}")


def fix_json_keys(json_str):
    """Fix unquoted or single-quoted keys in JSON string"""
    # Match keys that aren't properly double-quoted
    pattern = r'(?<!\\)\'?([a-zA-Z_][a-zA-Z0-9_]*)\'?\s*:'
    return re.sub(pattern, r'"\1":', json_str)


def extract_json_from_text(text):
    """Extract and clean JSON from LLM response text"""
    # Find JSON-like structure (handles both single object and array responses)
    json_match = re.search(r'(\[?\s*{[\s\S]*?}\s*\]?)', text)
    if json_match:
        json_str = json_match.group(1)
        # Clean common LLM artifacts
        json_str = re.sub(r'(\d+)%', r'\1', json_str)  # Remove % signs from numbers
        json_str = re.sub(r'(\d+)cm', r'\1', json_str)  # Remove units from numbers
        json_str = re.sub(r'(\d+)m\^2', r'\1', json_str)  # Remove units from BMI
        json_str = re.sub(r'"N/A"', '""', json_str)  # Replace N/A with empty string
        json_str = re.sub(r'"null"', '""', json_str)  # Replace "null" with empty string
        json_str = fix_json_keys(json_str)  # Fix unquoted keys
        return json_str
    return None


def transcribe_image(templates, image_paths=None):
    # Try to enable GPU
    ensure_gpu_ollama()
    
    # Check if CUDA is available
    cuda_device = os.environ.get('CUDA_VISIBLE_DEVICES', 'Not set')
    print(f"CUDA_VISIBLE_DEVICES: {cuda_device}")
    
    if image_paths is None:
        image_paths = [
            "../assets/kkl3.jpg",
            "../assets/kkl2.jpg"
        ]
    
    # Convert relative paths to absolute paths
    abs_paths = []
    for path in image_paths:
        abs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), path))
        print(f"Using image path: {abs_path}")
        if os.path.exists(abs_path):
            abs_paths.append(abs_path)
        else:
            print(f"Warning: Image not found at {abs_path}")
    
    if not abs_paths:
        print("No valid images to process")
        return {key: "" for template in templates for key in template}
    
    # Initialize combined result and Ollama client
    combined_data = {}
    
    # Create a single Ollama client instance
    client = ollama.Client(host='http://localhost:11434')
    
    system_prompt = f"""You are a medical transcription assistant specialized in extracting structured information from medical logs. Furthermore, you only speak in JSON, so do not generate any output that isn't JSON. Your task is to:
1. Carefully read and transcribe text from medical log images
2. Return data in valid JSON format, do not include any other text or formatting.
3. Extract specific information for each requested field. 
4. For fields that are marked via checkmarks or circles, return a "yes" value if the field is checked or there is a circle around the field, and "no" otherwise.
5. Leave fields empty ("") if information is not found. Do not use "null", "None", or "N/A".
6. Be precise and accurate in your transcription
7. Include the entire relevant section for each field, do not summarize or shorten the content
8. Do not make assumptions or fill in missing information
9. Maintain patient confidentiality
"""
    
    # Process each template with each image
    for i, template in enumerate(templates):
        if i >= len(abs_paths):
            print(f"Warning: No image available for template {i+1}")
            continue
        #load example repsonse
        example_response = load_template(str(i), "example_response.json")
            
        template_fields = list(template.keys())
        fields_str = "\n".join([f"- {field}" for field in template_fields])
        
        print(f"\nProcessing template {i+1} with fields:\n{fields_str}")

        user_prompt = f"""Below is an image of a medical log page. Please transcribe the text and extract information for each field and format it as JSON.

        Fields to extract:
        {fields_str} 

        Here is an example of the format you should follow:
        {json.dumps(example_response, indent=2)}
        """


        try:
            # Use the client instance directly
            response = client.chat(
                model='llama3.2-vision',
                messages=[
                    {
                        'role': 'system',
                        'content': system_prompt
                    },
                    {
                        'role': 'user',
                        'content': user_prompt,
                        'images': [abs_paths[i]]
                    }
                ],
                stream=False,  # Disable streaming for faster response
                options={
                    'num_gpu': 1,  # Explicitly request GPU
                    'temperature': 0.25,  # Lower temperature for more focused responses
                    'top_p': 0.9  # Slightly reduce randomness
                }
            )
            
            # Extract the response content
            response_text = response['message']['content'] if isinstance(response, dict) else response.message['content']
            print(f"\nRaw response for template {i+1}:", response_text)

            try:
                # Extract and clean JSON from response
                json_str = extract_json_from_text(response_text)
                if json_str:
                    structured_data = json.loads(json_str)
                    if isinstance(structured_data, list):
                        structured_data = structured_data[0]
                    
                    # Ensure all template fields exist
                    for field in template:
                        if field not in structured_data:
                            structured_data[field] = ""
                        elif structured_data[field] is None:
                            structured_data[field] = ""
                    
                    combined_data.update(structured_data)
                else:
                    raise ValueError(f"No JSON object found in response for template {i+1}")
                    
            except Exception as e:
                print(f"Error processing response for template {i+1}: {e}")
                # Add empty fields for this template
                for field in template:
                    combined_data[field] = ""
        except Exception as e:
            print(f"Error trying to transcribe template {i+1}: {e}")
            for field in template:
                    combined_data[field] = ""
    return combined_data


def load_template(template_name, directory):
    file_path = directory
    if not os.path.exists(file_path):
        return {"error": f"Template file {file_path} not found."}

    try:
        with open(file_path, "r") as file:
            templates = json.load(file)
        return templates.get(template_name, {})
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format in logbook_templates.json"}



# Example usage with multiple images
templates = [load_template("Adult_cardiac_log", "logbook_templates.json"), load_template("Adult_cardiac_log_2", "logbook_templates.json")]
image_paths = [
    "../assets/kkl3.jpg",
    "../assets/kkl2.jpg"  # Add more image paths as needed
]
# Use LLaMA to structure the text from multiple images
structured_data = transcribe_image(templates, image_paths)
print("\nFinal Structured Data:", structured_data)