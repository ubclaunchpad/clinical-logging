import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./PreviewSection.css";

export default function PreviewSection({
  imageFiles,
  isEditMode,
  toggleEditMode,
  handleRemoveImage,
}) {
  return (
    <div className="preview-section">
      <div className="edit-mode-toggle">
        <button onClick={toggleEditMode} className="edit-button">
          {isEditMode ? "Done Editing" : <EditIcon />}
        </button>
      </div>
      <h2>Preview</h2>
      <div className="preview-list">
        {imageFiles.length === 0 && <p>No photo uploaded yet.</p>}
        {imageFiles.map((image, index) => (
          <div key={index} className="preview-item">
            <div className="preview-content">
              <p>{image.name}</p>
              <img
                src={image.url}
                alt={image.name}
                style={{ width: "100%", height: "auto", maxHeight: "90vh" }}
              />
              {isEditMode && (
                <button
                  className="remove-button"
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
