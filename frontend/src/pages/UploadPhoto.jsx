import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import UploadArea from "../components/UploadPhoto/UploadArea";
import PreviewSection from "../components/UploadPhoto/PreviewSection";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./styles/UploadPhoto.css";

export default function UploadPhotos() {
  const [imageFiles, setImageFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageFiles([
          ...imageFiles,
          { name: file.name, url: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedImages);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleBack = () => {
    navigate("/newLog");
  };

  return (
    <div className="upload-photos-container">
      <div className="upload-box">
        <button className="back-button" onClick={handleBack}>
          <ArrowBackIcon />
        </button>
        <h1>Upload Photos</h1>
        <UploadArea handleFileUpload={handleFileUpload} />
        <div className="navigation-buttons">
          <button>
            <ArrowBackIosIcon className="nav-icon-left" />
            Previous
          </button>
          <button>
            Next
            <ArrowForwardIosIcon className="nav-icon-right" />
          </button>
        </div>
      </div>

      <PreviewSection
        imageFiles={imageFiles}
        isEditMode={isEditMode}
        toggleEditMode={toggleEditMode}
        handleRemoveImage={handleRemoveImage}
      />
    </div>
  );
}
