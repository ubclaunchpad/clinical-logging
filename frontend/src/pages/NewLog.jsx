import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import ModeIcon from "@mui/icons-material/Mode";
import Navbar from "../components/Navbar/Navbar";
import "./styles/NewLog.css";

export default function NewLog() {
  return (
    <div>
      <Navbar variant="newLog" />
      <CTASection />
    </div>
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
        <button onClick={handleUploadPhoto}>
          <ImageIcon className="add-icon" />
          Upload Photo
        </button>
        <button onClick={handleEnterManually}>
          <ModeIcon className="add-icon" />
          Enter Manually
        </button>
      </div>
    </div>
  );
}