import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { CLButtonPrimary, CLButtonSecondary } from "../../Buttons/CLButtons"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider'
import { PhotoIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
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
          <Typography variant="h6" component="h2">
            How would you like to create a new log?
          </Typography>
          <Divider />
          <CLButtonPrimary className="upload-photo-button" onClick={handleUploadPhoto} width={"330px"}>
            <PhotoIcon className="modal-icon" />
            <p>Upload Photo</p>
          </CLButtonPrimary>
          <CLButtonSecondary className="create-manually-button" onClick={handleCreateManually} width={"330px"}>
            <PencilSquareIcon className="modal-icon" />
            <p>Create Manually</p>
          </CLButtonSecondary>
        </Box>
      </Modal>
    </div>
  );
}