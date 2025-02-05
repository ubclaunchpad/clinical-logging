import json
import re


def load_keys(filePath):
    with open(filePath, 'r') as file:
        data = json.load(file)
    return data['keys']

def parse_florence_output(output, keys):
    if isinstance(output, dict):
        output = json.dumps(output) # convert to JSON-formatted string
    
    parsed_data = {}
    
    for key in keys:
        # Use regex to find the value for the key
        pattern = re.compile(f"{re.escape(key)}:(.*?)(?=(?:{'|'.join(map(re.escape, keys))}|$))", re.DOTALL)
        match = pattern.search(output)

        if match:
            value = match.group(1).strip()
            parsed_data[key] = value

    # Convert the parsed data to JSON format
    json_data = json.dumps(parsed_data, indent=4)
    return json_data