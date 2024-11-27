import { useNavigate } from "react-router-dom";
import { NavContentWrapper } from "../components/NavContentWrapper/NavContentWrapper";
import ImageIcon from "@mui/icons-material/Image";
import ModeIcon from "@mui/icons-material/Mode";
import { CLButtonPrimary, CLButtonSecondary } from "../components/Buttons/CLButtons";
import "./styles/NewLog.css";

export default function NewLog() {
  return (
    <NavContentWrapper>
      <CTASection />
    </NavContentWrapper>
  );
}

function CTASection() {
  const navigate = useNavigate();

  const handleUploadPhoto = () => {
    navigate("/uploadPhotos");
  };

  const handleEnterManually = () => {
    navigate("/manualEdit");
  };

  return (
    <div className="cta-section">
      <h2>How would you like to create a new log?</h2>
      <div className="buttons-container">
        <CLButtonPrimary onClick={handleUploadPhoto} width={"240px"}>
          <ImageIcon className="add-icon" />
          Upload Photo
        </CLButtonPrimary>
        <CLButtonSecondary onClick={handleEnterManually}  width={"240px"}>
          <ModeIcon className="add-icon" />
          Enter Manually
        </CLButtonSecondary>
      </div>
    </div>
  );
}
