import { useState, useEffect } from "react";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import "./UploadPhoto.css";
import { useNavigate } from "react-router-dom";
import PreviewSection from "../../components/UploadPhoto/PreviewSection";
import UploadArea from "../../components/UploadPhoto/UploadArea";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import LoadingScreen from "../loading_screen/LoadingScreen";

export default function UploadPhoto() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isLoading] = useState(false);
  const [progress] = useState(0);

  const handleTranscribe = () => {
    if (files.length === 0) {
      alert("Please upload an image first");
      return;
    }

    navigate("/loading-screen", {
      state: { imageFile: files[0].file },
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen progress={progress} />
      ) : (
        <>
          <NavContentWrapper>
            <MainContent
              files={files}
              setFiles={setFiles}
              handleTranscribe={handleTranscribe}
            />
          </NavContentWrapper>
          <div className="transcribe-button-container">
            <button
              className="transcribe-button"
              onClick={handleTranscribe}
              disabled={files.length === 0}
            >
              Transcribe
            </button>
          </div>
        </>
      )}
    </>
  );
}

function MainContent({ files, setFiles, handleTranscribe }) {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  /** Allowed file types */
  const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

  /** Handle files from input or drop */
  const handleFiles = (newFiles) => {
    const filesArray = Array.from(newFiles);

    const filesWithPreview = filesArray.map((file) => {
      return {
        file: file, // Store the actual File object
        timestamp: Date.now(),
        preview: URL.createObjectURL(file),
      };
    });
    setFiles((prev) => [...filesWithPreview, ...prev]); // Add new files to beginning
  };

  /** Toggle preview visibility */
  const handlePreviewClick = () => {
    setShowPreview((prev) => !prev);
  };

  /** Clean up object URLs when component unmounts or files change */
  useEffect(() => {
    return () => {
      files.forEach((fileData) => {
        if (fileData.preview) {
          URL.revokeObjectURL(fileData.preview);
        }
      });
    };
  }, [files]);

  return (
    <div className="upload-container">
      <div className="upload-photo-header">
        <button className="back-button" onClick={() => navigate("/home")}>
          <ChevronLeftIcon className="upload-back-icon" />
        </button>
        <div className="title-wrapper">
          <h2 className="upload-photo-title">Upload Photos</h2>
        </div>
        <button className="preview-button" onClick={handlePreviewClick}>
          Preview
          <ChevronDoubleLeftIcon className="preview-icon" />
        </button>
      </div>

      {showPreview && (
        <PreviewSection
          files={files}
          setFiles={setFiles}
          handlePreviewClick={handlePreviewClick}
          handleTranscribe={handleTranscribe}
        />
      )}

      <UploadArea
        ALLOWED_FILE_TYPES={ALLOWED_FILE_TYPES}
        handleFiles={handleFiles}
      />

      <div className="upload-controls">
        <button className="control-button prev">
          <ChevronLeftIcon className="control-icon" />
        </button>
        <span className="page-indicator">
          <span className="current-page">1</span>/1
        </span>
        <button className="control-button next">
          <ChevronRightIcon className="control-icon" />
        </button>
      </div>
    </div>
  );
}
