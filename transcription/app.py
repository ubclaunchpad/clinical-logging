from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PIL import Image
from qwen import qwen
from time import sleep
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
    sleep(10)
    return jsonify({
        "type": "adult_cardiac_logs",
        "title": "Title",
        "case_no": 3425,
        "patient_id": "547382874",
        "age": 75,
        "surgeon": "Dr. John Smith",
        "or_date": "07/10/2024",
        "reason_for_referral": "CABG",
        "hpi": "Heavy squeezing sensation in chest radiation to left arm for 2 weeks",
        "pmhx_htn": 1,
        "pmhx_dm2": 1,
        "pmhx_dlp": 0,
        "pmhx_cva": 0,
        "gender": "Male",
        "social_etoh": "v",
        "social_smoking": "v",
        "social_drugs": "X",
        "allergies": "N/A",
        "medicine": "Melformin: 500mg blue daily Lisinopous 100g daily",
        "exam_weight": 85,
        "exam_height": 178,
        "exam_bmi": 26.8,
        "exam_veins": "No varicosities noted; saphenos veins appear suitable for harvesting",
        "exam_allen_test": "t;both radial 8 ulnar arteris are latent",
        "echo_ef": 45,
        "echo_rvfx": None,
        "invx_wma": "hypokineses of anterior 2 lateral wall",
        "invx_aorta": "normal",
        "invx_valves": "normal",
        "cxr": "enlarged heart",
        "exam_pulses_top_left": 1,
        "exam_pulses_top_right": 1,
        "exam_pulses_bottom_left": 1,
        "exam_pulses_bottom_right": 1,
        "invx_w": None,
        "invx_hb": None,
        "invx_plt": None,
        "invx_hct": None,
        "invx_na": None,
        "invx_cl": None,
        "invx_bun": None,
        "invx_glu": None,
        "invx_creat": None,
        "invx_co2": None,
        "invx_k": None,
    "surgical_plan": f"Perform quadruple Coronary artery bypass graft with Saphenous Vein grafts and the left internal mammary artery to the left anterior descending 2 hours post-op. Sizable condition Scheduled for post-op day 3 to check graft function. ###SECTION### I operator Base OR Post Flag for F/U ###SECTION###",       
    "first_operator_flag": f"",
    "or_flag": f"OR",
    "issue_flag": f"",
    "fu_flag": f"###SECTION###",
    "op_notes_cpb": f"2h 45 m",
    "op_notes_xc": f"1h 30 m",
    "op_notes_ca": f"h m",
    "my_role": f"Incision: median Sternotomy Grafts used Left internal mammary artery (LIMA) to LADs, and Saphenous vein grafts to RCA, OM1, and diagonal branch. Findings: Extensive calcifications of Coronary arteries noted. Successful harvesting of the LIMA and Saphenous veins with no intraoperative complications ###SECTION###",
    "post_op_course": f"Initial recovery: Uneventful, transferred into ICU, maintained on mechanical ventilation for 1 hour. Post-OP Monitoring: hemodynamics remained stable. No significant arrhythmias observed. Extracted successfully after 6 hours. Medications: initiated on anticoagulants and beta-blockers post-OP Outcome: Patient was oriented on POD2, discharged to Step-down unit on POD2 ###SECTION###",
    "learning_points": f", Key Lessons Gained hands-on experience with laparoscopic thyroidectomy. Understood the importance of intraoperative monitoring during CPB to detect early signs of hemodynamic instability. Learned effective communication with the OR team for smooth management during high stress periods of the surgery."
})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)