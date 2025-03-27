from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PIL import Image
from qwen import qwen

app = Flask(__name__)
CORS(app)

@app.route("/api/transcribe", methods=["POST"])
def transcribe():
    if "image1" not in request.files and "image2" not in request.files:
        return jsonify({"error": "At least one image is required"}), 400

    image_paths = []
    temp_paths = []
    
    try:
        # Create temp directory
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)
        
        # Process first image (if provided)
        if "image1" in request.files:
            image1 = request.files["image1"]
            temp_path1 = os.path.join(temp_dir, "kkl3.jpg")  # Use expected filename
            image = Image.open(image1).convert("RGB")
            image.save(temp_path1)
            image_paths.append(temp_path1)
            temp_paths.append(temp_path1)
        
        # Process second image (if provided)
        if "image2" in request.files:
            image2 = request.files["image2"]
            temp_path2 = os.path.join(temp_dir, "kkl2.jpg")  # Use expected filename
            image = Image.open(image2).convert("RGB")
            image.save(temp_path2)
            image_paths.append(temp_path2)
            temp_paths.append(temp_path2)
        
        # Process with Qwen
        structured_data = qwen()
        
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