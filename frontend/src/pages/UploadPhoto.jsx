import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

function UploadPhotos() {
  const [imageFiles, setImageFiles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false); 
  const navigate = useNavigate(); 


  const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) { 
          const reader = new FileReader();
          reader.onload = function (e) {
              setImageFiles([...imageFiles, { name: file.name, url: e.target.result }]);
          };
          reader.readAsDataURL(file); 
      } else {
          alert('Please upload a valid image file.');
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
        
        <label htmlFor="fileInput" className="upload-area">
          <input 
            type="file" 
            id="fileInput" 
            accept="image/*"
            style={{ display: 'none' }} 
            onChange={handleFileUpload} 
          />
          <div className="upload-icon">
            <div>
              <AddPhotoAlternateIcon style={{ fontSize: '60px' }} />
              <p>Upload Photos<br />or drag and drop</p>
            </div>
          </div>
        </label>

        <div className="navigation-buttons">
          <button>
            <ArrowBackIosIcon className="nav-icon-left"/>
            Previous
          </button>
          <button>
            Next
            <ArrowForwardIosIcon className="nav-icon-right"/>
          </button>
        </div>
      </div>

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
                  style={{ width: '100%', height: 'auto', maxHeight: '90vh' }} 
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
    </div>
  );
}

export default UploadPhotos;