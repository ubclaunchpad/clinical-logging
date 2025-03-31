import requests
import json
import os

def trocr():
    from transformers import TrOCRProcessor, VisionEncoderDecoderModel
    from PIL import Image
    import requests

    # load image from the IAM database
    #open from kkl.jpg in assets folder instead
    url = '../assets/kkl.jpg'
    image = Image.open(url).convert("RGB")

    processor = TrOCRProcessor.from_pretrained('microsoft/trocr-base-handwritten')
    model = VisionEncoderDecoderModel.from_pretrained('microsoft/trocr-base-handwritten')
    pixel_values = processor(images=image, return_tensors="pt").pixel_values

    generated_ids = model.generate(pixel_values)
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

    print(generated_text)

def clean_transcribed_text(text):
    # Remove all </s> and <s> tags
    text = text.replace("</s>", "").replace("<s>", "")
    # Remove multiple spaces and newlines
    text = " ".join(text.split())
    return text.strip()

def process_flags(text):
    # Define the four specific flags in order
    binary_flags = {
        "first_operator_flag": False,  # First operator
        "or_flag": False,             # OR
        "issue_flag": False,          # Issue
        "fu_flag": False              # F/U
    }
    
    # Clean the text first
    clean_text = clean_transcribed_text(text).lower()

    print("\nDEBUG - Raw text before processing:")
    print(clean_text)
    
    # Split text into lines to check each box separately
    lines = clean_text.split('\n')
    
    # Map common variations of flag names to their template keys
    flag_mappings = {
        "operator": "first_operator_flag",
        "1 operator": "first_operator_flag",
        "OR": "or_flag",
        "POST": "issue_flag",
        "Flag for F/U": "fu_flag",
        "F/U": "fu_flag",
    }
    
    # Check each line for flag content
    for line in lines:
        line = line.strip().lower()
        for key_word, flag_key in flag_mappings.items():
            if key_word in line:
                # Check if there's content beyond just the flag label
                remaining_content = line.replace(key_word, '').strip()
                if remaining_content and not remaining_content.isspace():
                    binary_flags[flag_key] = True
    
    # Convert to string format for easier reading
    flag_text = "Flags present: " + ", ".join([flag for flag, value in binary_flags.items() if value])
    if not any(binary_flags.values()):
        flag_text = "No flags present"
    
    return flag_text

def florence():
    import requests
    import torch
    from PIL import Image
    from transformers import AutoProcessor, AutoModelForCausalLM
    import supervision as sv 
    import cv2
    import os

    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    model = AutoModelForCausalLM.from_pretrained("microsoft/Florence-2-large", torch_dtype=torch_dtype, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained("microsoft/Florence-2-large", trust_remote_code=True)

    # Define regions for image splitting
    new_width, new_height = 600, 960
    regions = {
        "surgical_plan": (0, 0, int(new_width * 0.88), int(new_height * 0.3)),
        "flags": (int(new_width * 0.88), 0, new_width, int(new_height * 0.33)),
        "operative_notes": (0, int(new_height * 0.3), new_width, int(new_height * 0.55)),
        "learning_points": (0, int(new_height * 0.55), new_width, new_height)
    }

    # Load and resize the original image
    url = "../assets/kkl4.jpg"
    cv_image = cv2.imread(url)
    cv_image = cv2.resize(cv_image, (new_width, new_height))

    # Store transcribed text for each region
    transcribed_sections = {}

    # Process each region
    for name, (x, y, w, h) in regions.items():
        # Crop the region
        cropped = cv_image[y:h, x:w]
        
        # Convert CV2 image to PIL Image
        cropped_rgb = cv2.cvtColor(cropped, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(cropped_rgb)

        # Process with Florence
        prompt = "<OCR>"
        inputs = processor(text=prompt, images=pil_image, return_tensors="pt").to(device, torch_dtype)

        generated_ids = model.generate(
            input_ids=inputs["input_ids"],
            pixel_values=inputs["pixel_values"],
            max_new_tokens=1024,
            num_beams=3,
            do_sample=False
        )

        generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]
        
        # Clean and process the text based on section
        if name == "flags":
            transcribed_sections[name] = process_flags(generated_text)
        else:
            transcribed_sections[name] = clean_transcribed_text(generated_text)

    return transcribed_sections

def load_template(template_name):
    file_path = "templates/logbook_templates.json" 

    if not os.path.exists(file_path):
        return {"error": f"Template file {file_path} not found."}

    try:
        with open(file_path, "r") as file:
            templates = json.load(file)
        return templates.get(template_name, {})
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format in logbook_templates.json"}

def structure_with_llama(raw_text, template):
    import requests
    
    # Preprocess raw text to replace newlines with spaces
    raw_text = ' '.join(raw_text.split())
    
    # Create a prompt that explains the task and shows the expected format
    template_fields = list(template.keys())
    fields_str = "\n".join([f"- {field}" for field in template_fields])

    print("Fields: " + fields_str)
    
    prompt = f"""Below is a transcribed medical log. Please extract information for each field and format it as JSON. If a field's information is not found, leave it empty.

Fields to extract:
{fields_str}

Transcribed text:
{raw_text}

Please format the response as a valid JSON object with the fields above. Do not make up different fields other than the ones listed in the template. Only include the JSON in your response, no additional text."""

    # Call Ollama API
    response = requests.post('http://localhost:11434/api/generate',
        json={
            "model": "llama3.2:3b",
            "prompt": prompt,
            "stream": False
        }
    )
    
    if response.status_code == 200:
        response_text = response.json()['response']
        
        # Extract JSON from response
        try:
            start = response_text.find("{")
            end = response_text.rfind("}") + 1
            json_str = response_text[start:end]
            structured_data = json.loads(json_str)
            
            # Ensure all template fields exist
            for field in template:
                if field not in structured_data:
                    structured_data[field] = ""
                    
            return structured_data
        except json.JSONDecodeError:
            print(response_text)
            print("Error: Could not parse LLaMA output as JSON")
            return {key: "" for key in template}
    else:
        print(f"Error calling Ollama API: {response.text}")
        return {key: "" for key in template}

# testing workflow
transcribed_sections = florence()
print("\n=== OCR Output by Section ===")
for section, text in transcribed_sections.items():
    print(f"\n{section.upper()}:")
    print(text)
print("\n=== End of OCR Output ===\n")

template = load_template("Adult_cardiac_log_2")

# Combine all sections for structured data extraction
combined_text = f"""
Surgical Plan: {transcribed_sections['surgical_plan']}
Flags: {transcribed_sections['flags']}
Operative Notes: {transcribed_sections['operative_notes']}
Learning Points: {transcribed_sections['learning_points']}
"""

structured_data = structure_with_llama(combined_text, template)
print("\nStructured Data:", structured_data)