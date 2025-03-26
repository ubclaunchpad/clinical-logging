import torch
import os
import cv2
from PIL import Image
from transformers import Qwen2_5_VLForConditionalGeneration, AutoTokenizer, AutoProcessor
from utils.text_to_json import convert_text_to_json, process_text_file
import json

# Section separator that won't appear in normal text
SECTION_SEPARATOR = "\n\n###SECTION###\n\n"

def map_to_logbook_template(json_output):
    """Map fields from modified template to logbook template format by position"""
    # Load both templates
    with open("templates/logbook_templates.json", 'r') as f:
        logbook_templates = json.load(f)
    with open("templates/modified_templates.json", 'r') as f:
        modified_templates = json.load(f)
    
    # Get the field names in order
    modified_fields = list(modified_templates["adult_cardiac_log_2"].keys())
    logbook_fields = list(logbook_templates["Adult_cardiac_log_2"].keys())
    
    # Create result dictionary with all fields initialized to None
    result = {key: None for key in logbook_fields}
    
    # Map fields by position
    for modified_field, logbook_field in zip(modified_fields, logbook_fields):
        if modified_field in json_output:
            result[logbook_field] = json_output[modified_field].replace(SECTION_SEPARATOR, "")
    
    return result

def process_image(image_path):
    # Convert relative paths to absolute paths
    abs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), image_path))
    print(f"Using image path: {abs_path}")
    if not os.path.exists(abs_path):
        print(f"Warning: Image not found at {abs_path}")
        return None
    return abs_path

def qwen():
    # Load the model in half-precision on the available device(s)
    model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
        "Qwen/Qwen2.5-VL-3B-Instruct",  
        device_map="auto"
    )
    processor = AutoProcessor.from_pretrained(
        "Qwen/Qwen2.5-VL-3B-Instruct", 
        use_fast=True
    )

    # Define dimensions
    new_width, new_height = 600, 960

    # Define regions for both pages
    regions_by_page = {
        "kkl2.jpg": {
            "surgical_plan": (0, 0, int(new_width * 0.88), int(new_height * 0.3)),
            "flags": (int(new_width * 0.88), 0, new_width, int(new_height * 0.33)),
            "operative_notes": (0, int(new_height * 0.3), new_width, int(new_height * 0.55)),
            "post_op_notes": (0, int(new_height * 0.55), new_width, int(new_height * 0.75)),
            "learning_points": (0, int(new_height * 0.75), new_width, int(new_height * 0.95))
        },
        "kkl3.jpg": {
            "basics": (0, 0, new_width, int(new_height * 0.171)),
            "case_details": (0, int(new_height * 0.171), new_width, int(new_height * 0.22)),
            "hpi": (0, int(new_height * 0.22), int(new_width*0.5), int(new_height * 0.30)),
            "social": (int(new_width*0.5), int(new_height * 0.22), new_width, int(new_height * 0.30)),
            "PMHx": (0, int(new_height * 0.30), int(new_width*0.2), int(new_height * 0.45)),
            "medications": (int(new_width*0.2), int(new_height * 0.30), int(new_width*0.7), int(new_height * 0.45)),
            "allergies": (int(new_width*0.7), int(new_height * 0.30), new_width, int(new_height * 0.45)),
            "exam": (0, int(new_height * 0.45), int(new_width*0.385), int(new_height * 0.54)),
            "veins": (int(new_width*0.385), int(new_height * 0.45), int(new_width*0.55), int(new_height * 0.66)),
            "allen_test": (int(new_width*0.55), int(new_height * 0.45), int(new_width*0.69), int(new_height * 0.66)),
            "INVx": (0, int(new_height * 0.54), int(new_width * 0.4), int(new_height * 0.70)),
            "CXR_CT": (int(new_width * 0.65), int(new_height * 0.612), new_width, int(new_height * 0.762))
        }
    }

    # Process both images
    all_transcribed_sections = {}
    image_paths = ["../assets/kkl3.jpg", "../assets/kkl2.jpg"]

    for image_path in image_paths:
        # Get image filename
        image_filename = os.path.basename(image_path)
        regions = regions_by_page.get(image_filename)
        if not regions:
            print(f"No regions defined for {image_filename}")
            continue

        # Process the image
        abs_image_path = process_image(image_path)
        if not abs_image_path:
            continue

        cv_image = cv2.imread(abs_image_path)
        if cv_image is None:
            print(f"Error: Could not load image at {abs_image_path}")
            continue

        cv_image = cv2.resize(cv_image, (new_width, new_height))

        # Process each region
        for name, (x, y, w, h) in regions.items():
            # Crop the region
            cropped = cv_image[y:h, x:w]
            
            # Convert CV2 image to PIL Image
            cropped_rgb = cv2.cvtColor(cropped, cv2.COLOR_BGR2RGB)
            pil_image = Image.fromarray(cropped_rgb)

            # Save temporary image
            temp_path = f"temp_{name}.jpg"
            pil_image.save(temp_path)
            
            # Create conversation for this region
            conversation = [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "url": temp_path
                        },
                        {
                            "type": "text",
                            "text": "Transcribe the text in this image accurately."
                        }
                    ]
                }
            ]

            inputs = processor.apply_chat_template(
                conversation,
                add_generation_prompt=True,
                tokenize=True,
                return_dict=True,
                return_tensors="pt"
            ).to(model.device)

            # Generate output for this region
            output_ids = model.generate(**inputs, max_new_tokens=2048)
            generated_ids = [output_ids[len(input_ids):] for input_ids, output_ids in zip(inputs.input_ids, output_ids)]
            output_text = processor.batch_decode(generated_ids, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]

            print(f"\nTranscribed {name}:")
            print(output_text)

            # Clean up temporary file
            os.remove(temp_path)
            
            all_transcribed_sections[name] = output_text

    # Combine sections in the correct order with the section separator
    section_order = ["basics", "case_details", "hpi", "social", "PMHx", "medications", "allergies", "exam", "veins", "allen_test", "INVx", "CXR/CT", "surgical_plan", "flags", "operative_notes", "post_op_notes", "learning_points"]
    combined_text = SECTION_SEPARATOR.join(all_transcribed_sections.get(section, "") for section in section_order)
    
    # Convert to JSON using the existing parser
    json_output = process_text_file(combined_text)
    
    # Map to logbook template format
    final_output = map_to_logbook_template(json_output)
    
    return final_output

if __name__ == "__main__":
    # Run transcription and get JSON output
    json_output = qwen()
    
    if json_output:
        print("\n=== JSON Output ===")
        print(json.dumps(json_output, indent=2))
        print("\n=== End of JSON Output ===\n")