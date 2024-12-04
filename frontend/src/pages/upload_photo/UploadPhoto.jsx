import { useState, useEffect } from "react";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import "./UploadPhoto.css";
import { useNavigate } from "react-router-dom";
import PreviewSection from "../../components/UploadPhoto/PreviewSection";
import UploadArea from "../../components/UploadPhoto/UploadArea";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function UploadPhoto() {
  const navigate = useNavigate();

  const handleTranscribe = () => {
    navigate("/load-transcription");
  };

  return (
    <>
      <NavContentWrapper>
        <MainContent handleTranscribe={handleTranscribe} />
      </NavContentWrapper>
      <div className="transcribe-button-container">
        <button className="transcribe-button" onClick={handleTranscribe}>
          Transcribe
        </button>
      </div>
    </>
  );
}

function MainContent({ handleTranscribe }) {
  const [files, setFiles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  /** Allowed file types */
  const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

  /** Handle files from input or drop */
  const handleFiles = (newFiles) => {
    const filesWithPreview = newFiles.map((file) => ({
      ...file,
      timestamp: Date.now(),
      preview: URL.createObjectURL(file),
    }));
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
      <ContentHeader onPreviewClick={handlePreviewClick} />

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
