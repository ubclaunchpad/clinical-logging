import json
import re

# Section separator that won't appear in normal text
SECTION_SEPARATOR = "\n\n###SECTION###\n\n"

def extract_time_values(text):
    """Extract time values from strings like 'CPB 2 h 45 m' as verbatim strings"""
    time_dict = {}
    patterns = {
        'CPB': r'CPB\s*([^XC\n]+?)(?=\s*XC|\s*$)',
        'XC': r'XC\s*([^CA\n]+?)(?=\s*CA|\s*$)',
        'CA': r'CA\s*([^M\n]+?)(?=\s*My Role|\s*$)'
    }
    
    for key, pattern in patterns.items():
        match = re.search(pattern, text)
        if match:
            # Clean and normalize whitespace
            value = match.group(1).strip()
            value = ' '.join(value.split())
            time_dict[key] = value
        else:
            time_dict[key] = ""
    
    return time_dict

def extract_section(text, section_marker, end_markers):
    """Extract text between section_marker and any of the end_markers or section separator"""
    if section_marker not in text:
        return ""
    
    start_idx = text.find(section_marker) + len(section_marker)
    
    # Find positions of all end markers
    end_indices = [text.find(marker, start_idx) for marker in end_markers if marker in text[start_idx:]]
    end_indices = [idx for idx in end_indices if idx != -1]
    
    # Find section separator position
    separator_pos = text.find(SECTION_SEPARATOR, start_idx)
    if separator_pos != -1:
        end_indices.append(separator_pos)
    
    if not end_indices:
        extracted_text = text[start_idx:].strip()
    else:
        extracted_text = text[start_idx:min(end_indices)].strip()
    
    # Remove any section separators from the extracted text
    extracted_text = extracted_text.replace(SECTION_SEPARATOR, "")
    
    # Clean and normalize whitespace
    return ' '.join(extracted_text.split())

def extract_flag_value(text, current_flag, next_flags):
    """Extract value for a flag, stopping at the next flag or section separator"""
    if current_flag not in text:
        return ""
        
    start_idx = text.find(current_flag) + len(current_flag)
    
    # Find the position of all next flags
    next_positions = []
    for flag in next_flags:
        pos = text.find(flag, start_idx)
        if pos != -1:
            next_positions.append(pos)
            
    # Find section separator position
    separator_pos = text.find(SECTION_SEPARATOR, start_idx)
    if separator_pos != -1:
        next_positions.append(separator_pos)
    
    # If we found any next position, take the earliest one
    if next_positions:
        end_idx = min(next_positions)
        extracted_text = text[start_idx:end_idx].strip()
    else:
        extracted_text = text[start_idx:].strip()
    
    # Remove any section separators from the extracted text
    extracted_text = extracted_text.replace(SECTION_SEPARATOR, "")
    
    # If the next flag comes immediately after, return empty string
    if not extracted_text:
        return ""
        
    return ' '.join(extracted_text.split())

#a list of modified templates to match with the headings in the logbook
#we map this to the logbook_templates for the fields that are to be passed to the database
def convert_text_to_json(text, template_path="templates/modified_templates.json"):
    # Load template
    with open(template_path, 'r') as f:
        templates = json.load(f)
    template = templates.get("adult_cardiac_log_2", {})
    
    # Clean up input text if it's a string representation of a list
    if text.startswith("['") and text.endswith("']"):
        text = text[2:-2]
    
    # Replace escaped newlines with spaces
    text = text.replace('\\n', ' ')
    # Replace actual newlines with spaces
    text = text.replace('\n', ' ')
    # Normalize multiple spaces to single space
    text = ' '.join(text.split())
    
    # Initialize result dictionary with empty strings
    result = {key: "" for key in template.keys()}
    
    # Extract times
    time_values = extract_time_values(text)
    result.update(time_values)
    
    # Define the sequence of flags for boundary detection
    flags_sequence = ['1 Operator', 'OR', 'Post', 'Flag for F/U', 'OPERATIVE NOTES']
    
    # Extract sections
    section_markers = {
        'Surgical Plan': ('Surgical Plan', ['OPERATIVE NOTES']),  # Will also stop at double space
        'Post-operative Course': ('Post-operative Course', ['Learning Points']),
        'Learning Points, Key Lessons': ('Learning Points', ['END']),
        'My Role': ('My Role', ['Post-operative Course'])
    }
    
    for field, (marker, end_markers) in section_markers.items():
        if field in template:
            result[field] = extract_section(text, marker, end_markers)
    
    # Extract flag values
    for i, flag in enumerate(flags_sequence[:-1]):  # Exclude last item as it's just a boundary
        if flag in template:
            next_flags = flags_sequence[i+1:]
            result[flag] = extract_flag_value(text, flag, next_flags)
    
    return result

def process_text_file(input_text):
    # Convert the text to JSON
    json_output = convert_text_to_json(input_text)
    
    # Print formatted JSON
    print(json.dumps(json_output, indent=2))
    return json_output

if __name__ == "__main__":
    # Read from sample_text file
    with open("sample_text.txt", "r") as f:
        example_text = f.read()
    
    json_output = process_text_file(example_text) 