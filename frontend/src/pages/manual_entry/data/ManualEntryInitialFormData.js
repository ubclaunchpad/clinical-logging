export const initialFormData = () => {
    return {
        case_no: 1234567,
        type: "Adult cardiac",
        patient_id: "P123456789",
        age: 40,
        surgeon: "Dr. John Smith",
        or_date: new Date("2025-03-29T07:00:00.000Z"),
        reason_for_referral: "Severe angina, left main coronary artery disease",
        hpi: "Patient presents with chronic angina, worsening over the past 3 months. Non-responsive to medical management.",
        pmhx_htn: 0,
        pmhx_dm2: 1,
        pmhx_dlp: 0,
        pmhx_cva: 1,
        gender: "Female",
        social_etoh: "Retired, lives with spouse, occasional alcohol use, non-smoker",
        social_smoking: "Never smoked",
        social_drugs: "No history of illicit drug use",
        allergies: "No known drug allergies", // AHHHH
        medicine: "Lorem ipsum",
        exam_weight: 72, // value is always in kg (metric)
        exam_height: 160, // value is always in cm (metric)
        exam_weight_imperial: false, // default is false
        exam_height_imperial: true, // default is false
        exam_bmi: 28.1,
        exam_veins: "No varicosities",
        exam_allen_test: "Negative for both radial and ulnar patency",
        echo_ef: 60,
        echo_rvfx: 12.5,
        invx_wma: "Lorem ipsum",
        invx_aorta: "Lorem ipsum",
        invx_valves: "Lorem ipsum",
        cxr: "No acute lung pathology, cardiomegaly present.",
        exam_pulses_top_left: 1,
        exam_pulses_top_right: 1,
        exam_pulses_bottom_left: 0,
        exam_pulses_bottom_right: 0,
        invx_w: 0.1,  // AHHHH
        invx_hb: 0.2,  // AHHHH
        invx_plt: 0.3,  // AHHHH
        invx_hct: 0.4,  // AHHHH
        invx_na: 0.1,  // AHHHH
        invx_cl: 0.2,  // AHHHH
        invx_bun: 0.3,  // AHHHH
        invx_glu: 0.4,  // AHHHH
        invx_creat: 0.5,  // AHHHH
        invx_co2: 0.6,  // AHHHH
        invx_k: 0.7,  // AHHHH
        cath_image: null,
        cath_text: null,
        ct_image: null,
        ct_text: null,
        surgical_plan: "Plan for coronary artery bypass grafting (CABG) involving left internal mammary artery (LIMA) to LAD and saphenous vein graft to RCA.",
        first_operator_flag: "Yes",
        or_flag: "Completed",
        issue_flag: "Follow-up scheduled for 1 week",
        fu_flag: "Follow-up readiness confirmed, no complications post-op",
        op_notes_cpb: "2h 51m",
        op_notes_xc: "4h 28m",
        op_notes_ca: null,
        my_role: "Senior resident assisting in bypass graft placement and surgical closure",
        post_op_course: "Stable in the ICU, extubated 6 hours post-op, no arrhythmias or complications.",
        learning_points: "Close monitoring of hemodynamics during CPB; careful handling of the left internal mammary artery for grafting.",
      }
}