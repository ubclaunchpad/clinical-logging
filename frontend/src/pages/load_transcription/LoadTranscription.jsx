import { useLocation, useNavigate } from "react-router-dom";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import "./LoadTranscription.css";

export default function LoadTranscription() {
  const location = useLocation();
  const navigate = useNavigate();
  const transcription = location.state?.transcription;

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
          {transcription || "No transcription data available"}
        </div>
      </div>
    </NavContentWrapper>
  );
}
