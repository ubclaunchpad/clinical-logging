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


def transcribe_image(templates, example_responses, image_paths=None):
    if not image_paths:
        print("No images to process")
        return {key: "" for template in templates for key in template}
    
    # Try to enable GPU only when we have images to process
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
    
    system_prompt = f"""You are a medical transcription assistant specialized in extracting structured information from medical logs. Your task is to carefully read and transcribe text from medical log images, focusing on actual content present in the image.

IMPORTANT: 
- You must transcribe the ACTUAL content from the image, not copy from examples
- Never use placeholder or example text
- If you can't read something clearly, leave it as an empty string
- Transcribe ALL text present in each field, especially narrative fields like 'my_role', 'learning_points', and 'post_op_course'

Rules:
1. Return only valid JSON format, no other text
2. Extract specific information for each requested field
3. For checkboxes/circles, return "yes" if marked, "no" if not
4. Leave fields empty ("") if information is not found
5. Be precise and accurate - transcribe exactly what you see
6. Include complete text for each field - do not summarize
7. Do not copy from example templates - use actual image content
8. Maintain patient confidentiality
"""
    
    # Process each template with each image
    for i, template in enumerate(templates):
        if i >= len(abs_paths):
            print(f"Warning: No image available for template {i+1}")
            continue
            
        template_fields = list(template.keys())
        fields_str = "\n".join([f"- {field}" for field in template_fields])
        
        print(f"\nProcessing template {i+1} with fields:\n{fields_str}")

        # First message: explain the structure
        structure_message = {
            'role': 'user',
            'content': f"""The response should be a JSON object with the following fields:
{fields_str}

Each field should contain the actual text found in the image for that field.
Pay special attention to narrative fields which may contain longer text."""
        }

        # Second message: actual transcription request
        transcription_message = {
            'role': 'user',
            'content': """Now, carefully examine the image and transcribe the ACTUAL content for each field.
Remember:
1. Transcribe the real content you see, not examples
2. Include ALL text, especially in narrative fields
3. Leave fields empty ("") only if no content is found
4. Do not summarize or shorten any text""",
            'images': [abs_paths[i]]
        }

        try:
            # Use the client instance directly
            response = client.chat(
                model='llama3.2-vision',
                messages=[
                    {
                        'role': 'system',
                        'content': system_prompt
                    },
                    structure_message,
                    transcription_message
                ],
                stream=False,
                options={
                    'num_gpu': 1,
                    'temperature': 0.1,
                    'top_p': 0.9,
                    'num_thread': 8,
                    'num_predict': 2048
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
        return {"error": "Invalid JSON format in templates/logbook_templates.json"}


if __name__ == "__main__":
    # Example usage with multiple images
    templates = [load_template("Adult_cardiac_log", "templates/logbook_templates.json"), load_template("Adult_cardiac_log_2", "templates/logbook_templates.json")]
    image_paths = [
        "../assets/kkl3.jpg",
        "../assets/kkl2.jpg"  # Add more image paths as needed
    ]
    example_responses = [load_template("1", "templates/example_response.json"), load_template("2", "templates/example_response.json")]
    # Use LLaMA to structure the text from multiple images
    structured_data = transcribe_image(templates, example_responses, image_paths)
    print("\nFinal Structured Data:", structured_data)