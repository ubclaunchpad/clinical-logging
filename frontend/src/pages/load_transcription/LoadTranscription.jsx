import { useLocation, useNavigate } from "react-router-dom";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import "./LoadTranscription.css";

export default function LoadTranscription() {
  const location = useLocation();
  const navigate = useNavigate();
  const transcription = location.state?.transcription;

  const fields = [
    { key: 'type', label: 'Type' },
    { key: 'title', label: 'Title' },
    { key: 'case_no', label: 'Case Number' },
    { key: 'patient_id', label: 'Patient ID' },
    { key: 'age', label: 'Age' },
    { key: 'surgeon', label: 'Surgeon' },
    { key: 'or_date', label: 'OR Date' },
    { key: 'reason_for_referral', label: 'Reason for Referral' },
    { key: 'hpi', label: 'HPI' },
    { key: 'pmhx_htn', label: 'PMHx HTN' },
    { key: 'pmhx_dm2', label: 'PMHx DM2' },
    { key: 'pmhx_dlp', label: 'PMHx DLP' },
    { key: 'pmhx_cva', label: 'PMHx CVA' },
    { key: 'gender', label: 'Gender' },
    { key: 'social_etoh', label: 'Social EtOH' },
    { key: 'social_smoking', label: 'Social Smoking' },
    { key: 'social_drugs', label: 'Social Drugs' },
    { key: 'allergies', label: 'Allergies' },
    { key: 'medicine', label: 'Medicine' },
    { key: 'exam_weight', label: 'Weight (kg)' },
    { key: 'exam_height', label: 'Height (cm)' },
    { key: 'exam_bmi', label: 'BMI' },
    { key: 'exam_veins', label: 'Veins Examination' },
    { key: 'exam_allen_test', label: 'Allen Test' },
    { key: 'echo_ef', label: 'Echo EF' },
    { key: 'echo_rvfx', label: 'Echo RVFx' },
    { key: 'invx_wma', label: 'WMA' },
    { key: 'invx_aorta', label: 'Aorta' },
    { key: 'invx_valves', label: 'Valves' },
    { key: 'cxr', label: 'CXR' },
    { key: 'exam_pulses_top_left', label: 'Pulses Top Left' },
    { key: 'exam_pulses_top_right', label: 'Pulses Top Right' },
    { key: 'exam_pulses_bottom_left', label: 'Pulses Bottom Left' },
    { key: 'exam_pulses_bottom_right', label: 'Pulses Bottom Right' },
    { key: 'invx_w', label: 'W' },
    { key: 'invx_hb', label: 'Hb' },
    { key: 'invx_plt', label: 'Plt' },
    { key: 'invx_hct', label: 'Hct' },
    { key: 'invx_na', label: 'Na' },
    { key: 'invx_cl', label: 'Cl' },
    { key: 'invx_bun', label: 'BUN' },
    { key: 'invx_glu', label: 'Glucose' },
    { key: 'invx_creat', label: 'Creatinine' },
    { key: 'invx_co2', label: 'CO2' },
    { key: 'invx_k', label: 'K' },
    { key: 'surgical_plan', label: 'Surgical Plan' },
    { key: 'first_operator_flag', label: 'First Operator Flag' },
    { key: 'or_flag', label: 'OR Flag' },
    { key: 'issue_flag', label: 'Issue Flag' },
    { key: 'fu_flag', label: 'Follow-up Flag' },
    { key: 'op_notes_cpb', label: 'CPB Time' },
    { key: 'op_notes_xc', label: 'Cross-clamp Time' },
    { key: 'op_notes_ca', label: 'Circulatory Arrest Time' },
    { key: 'my_role', label: 'My Role' },
    { key: 'post_op_course', label: 'Post-op Course' },
    { key: 'learning_points', label: 'Learning Points' }
  ];

  return (
    <NavContentWrapper>
      <div className="transcription-container">
        <div className="transcription-header">
          <button
            className="back-button"
            onClick={() => navigate("/upload-photo")}
          >
            <ChevronLeftIcon className="back-icon" />
          </button>
          <h2>Transcription Result</h2>
        </div>

        <div className="transcription-content">
          {transcription ? (
            <table className="transcription-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {fields.map(({ key, label }) => (
                  <tr key={key}>
                    <td className="field-name">{label}</td>
                    <td className="field-value">{transcription[key] || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No transcription data available"
          )}
        </div>
      </div>
    </NavContentWrapper>
  );
}
