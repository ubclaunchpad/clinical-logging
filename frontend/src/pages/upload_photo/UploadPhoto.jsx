import { useState, useEffect } from "react";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import {
  PhotoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import "./UploadPhoto.css";
import { useNavigate } from "react-router-dom";

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
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  /** Allowed file types */
  const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

  /** Function to filter valid files */
  const filterValidFiles = (fileList) =>
    Array.from(fileList).filter((file) =>
      ALLOWED_FILE_TYPES.includes(file.type)
    );

  /** Handle drag events */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    switch (e.type) {
      case "dragenter":
      case "dragover":
        setDragActive(true);
        break;
      case "dragleave":
        setDragActive(false);
        break;
      default:
        break;
    }
  };

  /** Handle files from input or drop */
  const handleFiles = (newFiles) => {
    const filesWithPreview = newFiles.map((file) => ({
      ...file,
      timestamp: Date.now(),
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...filesWithPreview, ...prev]); // Add new files to beginning
  };

  /** Handle drop event */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const validFiles = filterValidFiles(e.dataTransfer.files);
    handleFiles(validFiles);
  };

  /** Handle file input change */
  const handleFileInput = (e) => {
    const validFiles = filterValidFiles(e.target.files);
    handleFiles(validFiles);
  };

  /** Toggle preview visibility */
  const handlePreviewClick = () => {
    setShowPreview((prev) => !prev);
  };

  /** Toggle edit mode */
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  /** Handle image deletion */
  const handleDeleteImage = (timestampToDelete) => {
    setFiles((prevFiles) => {
      // Find the file to delete and revoke its URL
      const fileToDelete = prevFiles.find(
        (file) => file.timestamp === timestampToDelete
      );
      if (fileToDelete?.preview) {
        URL.revokeObjectURL(fileToDelete.preview);
      }
      // Filter out the deleted file
      return prevFiles.filter((file) => file.timestamp !== timestampToDelete);
    });
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
        <div className="preview-section">
          <div className="preview-header">
            <button className="preview-title" onClick={handlePreviewClick}>
              <ChevronDoubleRightIcon className="preview-section-icon" />
              <span>Preview</span>
            </button>
            <button
              className={`edit-button ${isEditing ? "active" : ""}`}
              onClick={handleEdit}
            >
              <PencilSquareIcon className="edit-icon" />
              <span>Edit</span>
            </button>
          </div>

          <div className="preview-list">
            {files.map((fileData, index) => (
              <div key={fileData.timestamp} className="preview-item">
                <img
                  src={fileData.preview}
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
                />
                {isEditing && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteImage(fileData.timestamp)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="preview-footer">
            <button className="transcribe-button" onClick={handleTranscribe}>
              Transcribe
            </button>
          </div>
        </div>
      )}

      <div
        className={`upload-area ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="file-input"
          accept={ALLOWED_FILE_TYPES.join(",")}
          multiple
          onChange={handleFileInput}
        />
        <label className="upload-label">
          <div className="upload-icon">
            <PhotoIcon className="icon-image" />
            <div className="plus-indicator">+</div>
          </div>
          <div className="upload-text">
            <h3>Upload Photos</h3>
            <p>or drag and drop</p>
          </div>
        </label>
      </div>

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
