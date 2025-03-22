import json
import re

def extract_time_values(text):
    """Extract time values from strings like 'CPB 2 h 45 m'"""
    time_dict = {}
    patterns = {
        'cpb_time': r'CPB\s*(\d+)\s*h\s*(\d+)\s*m',
        'xc_time': r'XC\s*(\d+)\s*h\s*(\d+)\s*m',
        'ca_time': r'CA\s*(\d+)\s*h\s*(\d+)\s*m'
    }
    
    for key, pattern in patterns.items():
        match = re.search(pattern, text)
        if match:
            hours, minutes = match.groups()
            time_dict[key] = f"{hours}h {minutes}m"
        else:
            time_dict[key] = ""
    
    return time_dict

def extract_section(text, section_marker, end_markers):
    """Extract text between section_marker and any of the end_markers"""
    if section_marker not in text:
        return ""
    
    start_idx = text.find(section_marker) + len(section_marker)
    end_indices = [text.find(marker, start_idx) for marker in end_markers if marker in text[start_idx:]]
    end_indices = [idx for idx in end_indices if idx != -1]
    
    if not end_indices:
        return text[start_idx:].strip()
    
    return text[start_idx:min(end_indices)].strip()

def convert_text_to_json(text, template_path="logbook_templates.json"):
    # Load template
    with open(template_path, 'r') as f:
        templates = json.load(f)
    template = templates.get("Adult_cardiac_log_2", {})
    
    # Clean up input text if it's a string representation of a list
    if text.startswith("['") and text.endswith("']"):
        text = text[2:-2]
    
    # Replace escaped newlines with actual newlines
    text = text.replace('\\n', '\n')
    
    # Initialize result dictionary with empty strings
    result = {key: "" for key in template.keys()}
    
    # Extract times
    time_values = extract_time_values(text)
    result.update(time_values)
    
    # Extract sections
    section_markers = {
        'surgical_plan': ('Surgical Plan', ['OPERATIVE NOTES', 'CPB', 'Post-operative']),
        'grafts_used': ('Grafts used:', ['Findings:', 'Post-operative']),
        'findings': ('Findings:', ['Post-operative', 'Learning Points']),
        'post_op_course': ('Post-operative Course', ['Learning Points', 'Gained']),
        'learning_points': ('Learning Points', ['END']),  # END is a placeholder
        'my_role': ('My Role', ['Incision:', 'Grafts used:', 'Findings:'])
    }
    
    for field, (marker, end_markers) in section_markers.items():
        if field in template:
            result[field] = extract_section(text, marker, end_markers)
    
    # Extract incision type
    incision_match = re.search(r'Incision:\s*([^\n]+)', text)
    if incision_match:
        result['incision'] = incision_match.group(1).strip()
    
    return result

def process_text_file(input_text):
    # Convert the text to JSON
    json_output = convert_text_to_json(input_text)
    
    # Print formatted JSON
    print(json.dumps(json_output, indent=2))
    return json_output

if __name__ == "__main__":
    # Example usage
    example_text = '''['Surgical Plan\n\nPerform quadruple Coronary artery bypass graft with Saphenous Vein grafts and the left internal mammary artery to the left coronary descending.\n\nOPERATIVE NOTES\n\nCPB 2 h 45 m    XC 1 h 30 m    CA h m    My Role\n\nIncision: median sternotomy\n\nGrafts used: Left internal mammary artery (LIMA) to LAD, and Saphenous vein grafts to RCA, OM1, and diagonal branch\n\nFindings: Extensive calcification of Coronary arteries noted. Successful harvesting of the LIMA and Saphenous vein with no intraoperative complications\n\nPost-operative Course\n\nInitial Recovery: Uneventful, transferred into ICU, maintained on Mechanical Ventilation for 9 hours post-op\n\nMonitoring: hemodynamics remained stable. No significant arrhythmias observed. Exhaled Successfully after 6 hours\n\nMedications: Initiated on anticoagulants and beta-blockers post-op\n\nOutcome: Patient alert and oriented on POD2, discharged to step-down unit on POD2\n\nLearning Points, Key Lessons\n\nGained hands-on experience w/ Saphenous Vein grafting\n\nUnderstood the importance of intraoperative monitoring during CPB to detect early signs of hemodynamic instability\n\nLearned effective communication with the OR team for smooth management during high stress periods of the surgery']'''
    
    json_output = process_text_file(example_text) 