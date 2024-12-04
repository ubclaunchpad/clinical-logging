import React, { useState } from "react";
import {
  ChevronDoubleRightIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import "./PreviewSection.css";

export default function PreviewSection({
  files,
  setFiles,
  handlePreviewClick,
  handleTranscribe,
}) {
  const [isEditing, setIsEditing] = useState(false);

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

  return (
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
  );
}
