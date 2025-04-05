import json
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from datetime import datetime
import re

def load_llm():
    """Load the small LLM model and tokenizer for text processing"""
    model_name = "meta-llama/Llama-3.2-3B-Instruct"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
        device_map="auto"
    )
    return model, tokenizer

def format_time_value(time_str):
    """Format time values to standard format (e.g., '2h 45m')"""
    if not time_str:
        return ""
    # Remove extra spaces and normalize format
    time_str = time_str.lower().strip()
    # Extract hours and minutes using regex
    match = re.search(r'(\d+)\s*h(?:ours?)?\s*(?:(\d+)\s*m(?:inutes?)?)?', time_str)
    if match:
        hours = match.group(1)
        minutes = match.group(2) or "0"
        return f"{hours}h {minutes}m"
    return time_str

def extract_number(value):
    """Extract first number from string"""
    if not value:
        return None
    match = re.search(r'\d+', str(value))
    return int(match.group()) if match else None

def parse_date(date_str):
    """Parse date string to standard format"""
    if not date_str:
        return ""
    try:
        # Try common date formats
        for fmt in ["%d/%m/%Y", "%m/%d/%Y", "%Y-%m-%d", "%d-%m-%Y"]:
            try:
                return datetime.strptime(date_str.strip(), fmt).strftime("%d/%m/%Y")
            except ValueError:
                continue
        return date_str
    except Exception:
        return date_str

def post_process_fields(json_data):
    """Post-process specific fields to ensure correct format"""
    if not isinstance(json_data, dict):
        return json_data

    # Fields that should be integers
    integer_fields = ["exam_weight", "exam_height", "exam_bmi"]
    for field in integer_fields:
        if field in json_data and json_data[field]:
            num = extract_number(json_data[field])
            json_data[field] = num if num is not None else json_data[field]

    # Echo EF percentage to integer
    if "Echo EF" in json_data and json_data["Echo EF"]:
        num = extract_number(json_data["Echo EF"])
        json_data["Echo EF"] = num if num is not None else json_data["Echo EF"]

    # Format time fields
    time_fields = ["CPB", "XC", "CA"]
    for field in time_fields:
        if field in json_data and json_data[field]:
            json_data[field] = format_time_value(json_data[field])

    # Format date fields
    if "OR Date" in json_data and json_data["OR Date"]:
        json_data["OR Date"] = parse_date(json_data["OR Date"])

    return json_data

def convert_text_to_json(text, field_names):
    """Convert text to JSON using a small LLM
    
    Args:
        text (str): The medical text to convert
        field_names (list): List of field names to extract from the text
    
    Returns:
        dict: Dictionary with extracted values for each field
        
    Raises:
        ValueError: If field_names is None or empty
    """
    # Validate inputs
    if not field_names:
        raise ValueError("field_names cannot be None or empty")
    if not isinstance(field_names, (list, tuple)):
        raise ValueError("field_names must be a list or tuple")
    if not text:
        print("Warning: Input text is empty")
        return {key: "" for key in field_names}
    
    try:
        # Initialize result dictionary with empty strings
        result = {key: "" for key in field_names}
        
        # Load model and tokenizer
        model, tokenizer = load_llm()
        
        # Prepare the prompt with examples and specific instructions
        prompt = f"""Extract information from the medical text below and format it as JSON. Follow these rules:

1. Use exactly these field names: {json.dumps(field_names, indent=2)}
2. Keep extracted information concise and relevant to each field
3. For time values (CPB, XC, CA), use format "2h 45m" (no spaces after numbers)
4. For exam measurements (weight, height, bmi), extract only the number
5. For Echo EF, extract only the number (without %)
6. For dates, use format DD/MM/YYYY
7. Leave fields empty ("") if no relevant information is found
8. Do not include information from one field in another field
9. Remove any field identifiers (like "ID:", "Age:") from the values
10. For medical history fields (PMHx), only include relevant conditions

Example format for specific fields:
- Time values: "2h 45m" (not "2 h 45 m" or "2 hours 45 minutes")
- Echo EF: 45 (not "45%" or "EF: 45%")
- exam_weight: 85 (not "85 kg" or "weight: 85")
- OR Date: "07/10/2024" (not "Date: 07/10/2024")

The medical text is:
{text}

Return only valid JSON with the exact field names shown above. The response should start with '{' and end with '}'."""
        
        # Generate response
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        with torch.inference_mode():
            outputs = model.generate(
                **inputs,
                max_new_tokens=2048,
                temperature=0.1,
                do_sample=False,
                top_p=0.95,
                repetition_penalty=1.1
            )
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Log the full response for debugging
        print("\n=== LLM Response Start ===")
        print(response)
        print("=== LLM Response End ===\n")
        
        # Extract JSON from response
        try:
            # Find JSON-like structure in the response
            json_start = response.find('{')
            json_end = response.rfind('}') + 1
            
            if json_start != -1 and json_end != -1:
                json_str = response[json_start:json_end]
                
                # Log the extracted JSON string
                print("\n=== Extracted JSON String Start ===")
                print(json_str)
                print("=== Extracted JSON String End ===\n")
                
                extracted_json = json.loads(json_str)
                
                # Post-process the extracted JSON
                extracted_json = post_process_fields(extracted_json)
                
                # Ensure all required fields are present
                for key in field_names:
                    if key not in extracted_json:
                        print(f"Warning: Missing field '{key}' in LLM response")
                        extracted_json[key] = ""
                    elif extracted_json[key] is None:
                        extracted_json[key] = ""
                
                return extracted_json
            else:
                print("\nError: No JSON structure found in LLM response. Looking for text between '{' and '}'")
                print(f"Found JSON start position: {json_start}")
                print(f"Found JSON end position: {json_end}")
                return result
        except json.JSONDecodeError as e:
            print(f"\nError parsing LLM output as JSON: {e}")
            print("Invalid JSON string:", json_str)
            return result
    except Exception as e:
        print(f"\nError in convert_text_to_json: {e}")
        print("Full error:", str(e))
        return result

def process_text_file(input_text, field_names):
    """Process text file and convert to JSON format
    
    Args:
        input_text (str): The text to process
        field_names (list): List of field names to extract
        
    Returns:
        dict: Dictionary with extracted values for each field
    """
    try:
        json_output = convert_text_to_json(input_text, field_names)
        print(json.dumps(json_output, indent=2))
        return json_output
    except ValueError as e:
        print(f"Error: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error in process_text_file: {e}")
        return None

if __name__ == "__main__":
    # Read from sample_text file
    with open("sample_text.txt", "r") as f:
        example_text = f.read()
    
    json_output = process_text_file(example_text, ["CPB", "XC", "CA"]) 