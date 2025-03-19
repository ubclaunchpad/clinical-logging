from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PIL import Image
from llama_vision import transcribe_image, load_template

app = Flask(__name__)
CORS(app)

def get_templates():
    """Load templates when needed"""
    return [
        load_template("Adult_cardiac_log", "logbook_templates.json"),
        load_template("Adult_cardiac_log_2", "logbook_templates.json")
    ]

def get_example_responses():
    """Load example responses when needed"""
    return [
        load_template("1", "example_response.json"),
        load_template("2", "example_response.json")
    ]

@app.route("/api/transcribe", methods=["POST"])
def transcribe():
    if "image1" not in request.files:
        return jsonify({"error": "First image (image1) is required"}), 400

    image_paths = []
    temp_paths = []
    
    try:
        # Create temp directory
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)
        
        # Process first image (required)
        image1 = request.files["image1"]
        temp_path1 = os.path.join(temp_dir, "temp_image1.jpg")
        image = Image.open(image1).convert("RGB")
        image.save(temp_path1)
        image_paths.append(temp_path1)
        temp_paths.append(temp_path1)
        
        # Process second image (optional)
        if "image2" in request.files:
            image2 = request.files["image2"]
            temp_path2 = os.path.join(temp_dir, "temp_image2.jpg")
            image = Image.open(image2).convert("RGB")
            image.save(temp_path2)
            image_paths.append(temp_path2)
            temp_paths.append(temp_path2)
        
        # Process with Llama Vision
        templates = get_templates()
        example_responses = get_example_responses()
        structured_data = transcribe_image(templates, example_responses, image_paths)
        
        # Clean up temporary files
        for temp_path in temp_paths:
            try:
                os.remove(temp_path)
            except:
                pass  # Ignore cleanup errors
            
        return jsonify(structured_data)
    except Exception as e:
        # Clean up temporary files in case of error
        for temp_path in temp_paths:
            try:
                os.remove(temp_path)
            except:
                pass
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)