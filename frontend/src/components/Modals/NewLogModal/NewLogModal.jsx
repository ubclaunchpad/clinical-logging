import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CLButtonPrimary, CLButtonSecondary } from "../../Buttons/CLButtons"
import {
  PhotoIcon,
  PencilSquareIcon,
  XMarkIcon,
  FolderIcon
} from '@heroicons/react/24/outline';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider'
import './NewLogModal.css'

export const NewLogModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleUploadPhoto = () => {
    navigate('/uploadPhotos');
  }

  const handleCreateManually = () => {
    navigate('/manualEntry');
  }

  const handleSavedUploads = () => {
    navigate('/savedUploads');
  }

  return (
    <div>
      <CLButtonPrimary onClick={handleOpen} width={"330px"}>
        Create New Log
      </CLButtonPrimary>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-content">
          <button className="close-modal-button" onClick={handleClose}>
            <XMarkIcon className="close-x-icon"/>
          </button>
          <p className="modal-description">
            How would you like to create a new log?
          </p>
          <Divider className="new-log-modal-divider"/>
          <div className='new-log-modal-buttons-container'>
            <CLButtonPrimary className="upload-photo-button" onClick={handleUploadPhoto} width={"330px"}>
              <PhotoIcon className="modal-icon" />
              <p>Upload Photo</p>
            </CLButtonPrimary>
            <CLButtonSecondary className="create-manually-button" onClick={handleCreateManually} width={"330px"}>
              <PencilSquareIcon className="modal-icon" />
              <p>Create Manually</p>
            </CLButtonSecondary>
            <CLButtonPrimary className="saved-uploads-button" onClick={handleSavedUploads} width={"330px"}>
              <FolderIcon className="modal-icon" />
              <p>Saved Uploads</p>
            </CLButtonPrimary>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
