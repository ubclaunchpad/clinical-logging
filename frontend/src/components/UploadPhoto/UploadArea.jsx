import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import "./UploadArea.css";

export default function UploadArea({ ALLOWED_FILE_TYPES, handleFiles }) {
  const [dragActive, setDragActive] = useState(false);

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

  return (
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
  );
}
