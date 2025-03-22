export const initialFormData = () => {
    return {
        case_no: 1234567,
        type: "Adult cardiac",
        patient_id: "P123456789",
        age: 40,
        surgeon: "Dr. John Smith",
        or_date: null,
        reason_for_referral: "Severe angina, left main coronary artery disease",
        hpi: "Patient presents with chronic angina, worsening over the past 3 months. Non-responsive to medical management.",
        // pmhx: null,
        pmhx_htn: 0, // TODO: add to DB
        pmhx_dm2: 1, // TODO: add to DB
        pmhx_dlp: 0, // TODO: add to DB 
        pmhx_cva: 1, // TODO: add to DB 
        gender: "Female",
        social_etoh: "Retired, lives with spouse, occasional alcohol use, non-smoker",
        social_smoking: "Never smoked",
        social_drugs: "No history of illicit drug use",
        social_allergies: "No known drug allergies",
        medicine: "Lorem ipsum",
        exam_weight: 72, // value is always in kg (metric)
        exam_height: 160, // value is always in cm (metric)
        exam_weight_imperial: false, // default is false
        exam_height_imperial: true, // default is false
        exam_bmi: 28.1,
        exam_veins: "No varicosities",
        exam_allen_test: "Negative for both radial and ulnar patency",
        echo_ef: 60, // TODO: should be numerical in DB !!!! change to text in fe
        echo_rvfx: 12.5,
        invx_wma: "Lorem ipsum",
        invx_aorta: "Lorem ipsum",
        invx_valves: "Lorem ipsum",
        cxr: "No acute lung pathology, cardiomegaly present.",
        exam_pulses_top_left: 1, // TODO: should be numberical / boolean in DB !!!! change to text in fe (any text is that is not the empty string or null)
        exam_pulses_top_right: 1, // TODO: should be numberical / boolean in DB !!!! change to text in fe (any text is that is not the empty string or null)
        exam_pulses_bottom_left: 0, // TODO: should be numberical / boolean in DB !!!! change to text in fe (any text is that is not the empty string or null)
        exam_pulses_bottom_right: 0, // TODO: should be numberical / boolean in DB !!!! change to text in fe (any text is that is not the empty string or null)
        // invx_echo: null,
        // invx_hb: null,
        // invx_w: null,
        // invx_pl: null,
        // invx_cr_1: null,
        // invx_cr_2: null,
        // invx_cr_3: null,
        // invx_cr_4: null,
        // invx_cr_5: null,
        // invx_cr_6: null,
        labs_w: 0.1, // TODO: add to DB !!!! invx_w
        labs_hb: 0.2, // TODO: add to DB
        labs_plt: 0.3, // TODO: add to DB
        labs_hct: 0.4, // TODO: add to DB
        labs_na: 0.1, // TODO: add to DB
        labs_cl: 0.2, // TODO: add to DB
        labs_bun: 0.3, // TODO: add to DB
        labs_glu: 0.4, // TODO: add to DB
        labs_creat: 0.5, // TODO: add to DB
        labs_co2: 0.6, // TODO: add to DB
        labs_k: 0.7, // TODO: add to DB
        cath_image: null,
        cath_text: null,
        ct_image: null,
        ct_text: null,
        surgical_plan: "Plan for coronary artery bypass grafting (CABG) involving left internal mammary artery (LIMA) to LAD and saphenous vein graft to RCA.",
        first_operator_flag: "Yes",
        or_flag: "Completed",
        issue_flag: "Follow-up scheduled for 1 week",
        fu_flag: "Follow-up readiness confirmed, no complications post-op",
        op_notes_cpb: "2h 51m", // TODO: existing data in DB doesn't make sense !!!! change to text in fe
        op_notes_xc: "4h 28m", // TODO: existing data in DB doesn't make sense !!!! change to text in fe
        op_notes_ca: null, // TODO: existing data in DB doesn't make sense !!!! change to text in fe
        my_role: "Senior resident assisting in bypass graft placement and surgical closure",
        post_op_course: "Stable in the ICU, extubated 6 hours post-op, no arrhythmias or complications.",
        learning_points: "Close monitoring of hemodynamics during CPB; careful handling of the left internal mammary artery for grafting.",
      }
}