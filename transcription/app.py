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
        
        # Process with Qwen, passing the image paths
        structured_data = qwen(image_paths=image_paths)
        
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

@app.route("/api/transcribe_cached", methods=["POST"])
def transcribe_cached():
    return jsonify({
    "surgical_plan": f"Perform quadruple Coronary artery bypass graft with Saphenous Vein grafts and the left internal mammary artery to the left anterior descending 2 hours post-op. Sizable condition Scheduled for post-op day 3 to check graft function. ###SECTION### I operator Base OR Post Flag for F/U ###SECTION###",       
    "first_operator_flag": f"",
    "or_flag": f"OR",
    "issue_flag": f"",
    "fu_flag": f"###SECTION###",
    "op_notes_cpb": f"2 h 45 m",
    "op_notes_xc": f"1 h 30 m",
    "op_notes_ca": f"h m",
    "my_role": f"Incision: median Sternotomy Grafts used Left internal mammary artery (LIMA) to LADs, and Saphenous vein grafts to RCA, OM1, and diagonal branch. Findings: Extensive calcifications of Coronary arteries noted. Successful harvesting of the LIMA and Saphenous veins with no intraoperative complications ###SECTION###",
    "post_op_course": f"Initial recovery: Uneventful, transferred into ICU, maintained on mechanical ventilation for 1 hour. Post-OP Monitoring: hemodynamics remained stable. No significant arrhythmias observed. Extracted successfully after 6 hours. Medications: initiated on anticoagulants and beta-blockers post-OP Outcome: Patient was oriented on POD2, discharged to Step-down unit on POD2 ###SECTION###",
    "learning_points": f", Key Lessons Gained hands-on experience with laparoscopic thyroidectomy. Understood the importance of intraoperative monitoring during CPB to detect early signs of hemodynamic instability. Learned effective communication with the OR team for smooth management during high stress periods of the surgery."
})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)