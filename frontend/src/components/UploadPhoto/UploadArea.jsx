import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./UploadArea.css";

export default function UploadArea({ handleFileUpload }) {
  return (
    <label htmlFor="fileInput" className="upload-area">
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />
      <div className="upload-icon">
        <div>
          <AddPhotoAlternateIcon style={{ fontSize: "60px" }} />
          <p>
            Upload Photos
            <br />
            or drag and drop
          </p>
        </div>
      </div>
    </label>
  );
}
