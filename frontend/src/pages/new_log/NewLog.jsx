import { useNavigate } from "react-router-dom";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import ImageIcon from "@mui/icons-material/Image";
import ModeIcon from "@mui/icons-material/Mode";
import { CLButtonPrimary, CLButtonSecondary } from "../../components/Buttons/CLButtons";
import "./NewLog.css";

export default function NewLog() {
  return (
    <NavContentWrapper>
      <MainContent />
    </NavContentWrapper>
  );
}

function MainContent() {
  const navigate = useNavigate();

  const handleUploadPhoto = () => {
    navigate("/uploadPhotos");
  };

  const handleEnterManually = () => {
    navigate("/manualEntry");
  };

  return (
    <div className="cta-section">
      <h2>How would you like to create a new log?</h2>
      <div className="buttons-container">
        <CLButtonPrimary onClick={handleUploadPhoto} width={"330px"}>
          <ImageIcon className="add-icon" />
          Upload Photo
        </CLButtonPrimary>
        <CLButtonSecondary onClick={handleEnterManually}  width={"330px"}>
          <ModeIcon className="add-icon" />
          Enter Manually
        </CLButtonSecondary>
      </div>
    </div>
  );
}
