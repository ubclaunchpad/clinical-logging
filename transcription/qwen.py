import torch
import os
import cv2
from PIL import Image
from transformers import AutoProcessor, AutoModelForImageTextToText, AutoTokenizer
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
    
    # Initialize result dictionary with all fields from both templates set to None
    result = {}
    result.update({key: None for key in logbook_templates["Adult_cardiac_log"].keys()})
    result.update({key: None for key in logbook_templates["Adult_cardiac_log_2"].keys()})
    
    # Map fields for adult_cardiac_log
    modified_fields_1 = list(modified_templates["Adult_cardiac_log"].keys())
    logbook_fields_1 = list(logbook_templates["Adult_cardiac_log"].keys())
    
    for modified_field, logbook_field in zip(modified_fields_1, logbook_fields_1):
        if modified_field in json_output:
            value = json_output[modified_field]
            # Handle string values
            if isinstance(value, str):
                result[logbook_field] = value.replace("###SECTION###", "")
            # Handle numeric values
            else:
                result[logbook_field] = value
    
    # Map fields for adult_cardiac_log_2
    modified_fields_2 = list(modified_templates["adult_cardiac_log_2"].keys())
    logbook_fields_2 = list(logbook_templates["Adult_cardiac_log_2"].keys())
    
    for modified_field, logbook_field in zip(modified_fields_2, logbook_fields_2):
        if modified_field in json_output:
            value = json_output[modified_field]
            # Handle string values
            if isinstance(value, str):
                result[logbook_field] = value.replace("###SECTION###", "")
            # Handle numeric values
            else:
                result[logbook_field] = value
    
    return result

def process_image(image_path):
    # Convert relative paths to absolute paths
    abs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), image_path))
    print(f"Using image path: {abs_path}")
    if not os.path.exists(abs_path):
        print(f"Warning: Image not found at {abs_path}")
        return None
    return abs_path

def qwen(image_paths=["../assets/kkl3.jpg", "../assets/kkl2.jpg"]):
    try:
        # Load templates first
        with open("templates/modified_templates.json", 'r') as f:
            modified_templates = json.load(f)
        
        # Get all field names from both templates
        field_names = []
        field_names.extend(list(modified_templates["Adult_cardiac_log"].keys()))
        field_names.extend(list(modified_templates["adult_cardiac_log_2"].keys()))
        
        if not field_names:
            raise ValueError("No field names found in templates")
            
        # Ensure field names are unique
        field_names = list(dict.fromkeys(field_names))
        
        # Load the model and processor with explicit trust_remote_code
        model_name = "Qwen/Qwen2.5-VL-3B-Instruct"
        
        # Initialize tokenizer first
        tokenizer = AutoTokenizer.from_pretrained(
            model_name,
            trust_remote_code=True
        )
        
        # Initialize model with proper configuration for vision-language tasks
        model = AutoModelForImageTextToText.from_pretrained(
            model_name,
            device_map="auto",
            trust_remote_code=True,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
        )
        
        # Initialize processor
        processor = AutoProcessor.from_pretrained(
            model_name,
            trust_remote_code=True
        )

        # Define dimensions
        new_width, new_height = 600, 960

        # Define regions for both pages
        regions_by_page = {
            0: {  # First image (kkl3.jpg equivalent)
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
            },
            1: {  # Second image (kkl2.jpg equivalent)
                "surgical_plan": (0, 0, int(new_width * 0.88), int(new_height * 0.3)),
                "flags": (int(new_width * 0.88), 0, new_width, int(new_height * 0.33)),
                "operative_notes": (0, int(new_height * 0.3), new_width, int(new_height * 0.55)),
                "post_op_notes": (0, int(new_height * 0.55), new_width, int(new_height * 0.75)),
                "learning_points": (0, int(new_height * 0.75), new_width, int(new_height * 0.95))
            }
        }

        # Process both images
        all_transcribed_sections = {}

        for i in range(len(image_paths)):
            if i > 1:
                break
            # Get regions for this image index
            regions = regions_by_page[i]
            if not regions:
                print(f"No regions defined for image {i}")
                continue

            # Process the image
            abs_image_path = process_image(image_paths[i])
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
                
                try:
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
                    with torch.inference_mode():
                        output_ids = model.generate(
                            **inputs,
                            max_new_tokens=2048,
                            do_sample=False,
                            temperature=0.1,
                            top_p=0.95,
                            repetition_penalty=1.1
                        )
                    
                    generated_ids = [output_ids[len(input_ids):] for input_ids, output_ids in zip(inputs.input_ids, output_ids)]
                    output_text = processor.batch_decode(generated_ids, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]

                    print(f"\nTranscribed {name}:")
                    print(output_text)

                    all_transcribed_sections[name] = output_text
                except Exception as e:
                    print(f"Error processing region {name}: {e}")
                    all_transcribed_sections[name] = ""
                finally:
                    # Clean up temporary file
                    try:
                        os.remove(temp_path)
                    except:
                        pass

        # Combine sections in the correct order with the section separator
        section_order = ["basics", "case_details", "hpi", "social", "PMHx", "medications", "allergies", "exam", "veins", "allen_test", "INVx", "CXR/CT", "surgical_plan", "flags", "operative_notes", "post_op_notes", "learning_points"]
        combined_text = SECTION_SEPARATOR.join(all_transcribed_sections.get(section, "") for section in section_order)
        
        # Convert to JSON using the text processor with field names
        json_output = process_text_file(combined_text, field_names)
        json_output['type'] = 'adult_cardiac_logs'
        # Map to logbook template format
        final_output = map_to_logbook_template(json_output)
        
        return final_output
    except Exception as e:
        print(f"Error in qwen function: {e}")
        raise

if __name__ == "__main__":
    # Run transcription and get JSON output
    json_output = qwen()
    
    if json_output:
        print("\n=== JSON Output ===")
        print(json.dumps(json_output, indent=2))
        print("\n=== End of JSON Output ===\n")