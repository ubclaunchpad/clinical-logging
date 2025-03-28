import { useLocation, useNavigate } from "react-router-dom";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import "./LoadTranscription.css";

export default function LoadTranscription() {
  const location = useLocation();
  const navigate = useNavigate();
  const transcription = location.state?.transcription;

  const fields = [
    { key: 'first_operator_flag', label: 'First Operator Flag' },
    { key: 'fu_flag', label: 'Follow-up Flag' },
    { key: 'issue_flag', label: 'Issue Flag' },
    { key: 'learning_points', label: 'Learning Points' },
    { key: 'my_role', label: 'My Role' },
    { key: 'op_notes_ca', label: 'Operation Notes CA' },
    { key: 'op_notes_cpb', label: 'Operation Notes CPB' },
    { key: 'op_notes_xc', label: 'Operation Notes XC' },
    { key: 'or_flag', label: 'OR Flag' },
    { key: 'post_op_course', label: 'Post-op Course' },
    { key: 'surgical_plan', label: 'Surgical Plan' }
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
