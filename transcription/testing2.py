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


def florence():
    import requests
    import torch
    from PIL import Image
    from transformers import AutoProcessor, AutoModelForCausalLM
    import supervision as sv 

    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    model = AutoModelForCausalLM.from_pretrained("microsoft/Florence-2-large", torch_dtype=torch_dtype, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained("microsoft/Florence-2-large", trust_remote_code=True)

    prompt = "<OCR>"

    url = "../assets/transcription-images/kkl1.png"
    image = Image.open(url).convert("RGB")

    inputs = processor(text=prompt, images=image, return_tensors="pt").to(device, torch_dtype)

    generated_ids = model.generate(
        input_ids=inputs["input_ids"],
        pixel_values=inputs["pixel_values"],
        max_new_tokens=1024,
        num_beams=3,
        do_sample=False
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]

    return generated_text

def load_template(template_name):
    file_path = "logbook_templates.json" 

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
    
    prompt = f"""Below is a transcribed medical log. Please extract information for each field and format it as JSON. If a field's information is not found, leave it empty.

Fields to extract:
{fields_str}

Transcribed text:
{raw_text}

Please format the response as a valid JSON object with the fields above. Only include the JSON in your response, no additional text."""

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
            print("Error: Could not parse LLaMA output as JSON")
            return {key: "" for key in template}
    else:
        print(f"Error calling Ollama API: {response.text}")
        return {key: "" for key in template}

# testing workflow
raw_text = florence()
print("OCR Output:", raw_text)
template = load_template("AdultCardiac_log")

# Use LLaMA to structure the text
structured_data = structure_with_llama(raw_text, template)
print("Structured Data:", structured_data)