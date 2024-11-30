import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { CLButtonSecondary } from "../../Buttons/CLButtons"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider'
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import './ConfirmCancelModal.css'

export const ConfirmCancelModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/homepage');
  }

  return (
    <div>
      <CLButtonSecondary onClick={handleOpen}>
       <XMarkIcon />
        <p>Cancel</p>
      </CLButtonSecondary>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-content">
          <ExclamationCircleIcon />
          <Typography variant="h6" component="h2">
            Are you sure you would like to cancel without saving?
          </Typography>
          <Divider />
          <button style={{backgroundColor: "red"}} onClick={handleConfirm}>Confirm</button>
          <CLButtonSecondary onClick={handleClose}>
            Cancel
          </CLButtonSecondary>
        </Box>
      </Modal>
    </div>
  );
}
