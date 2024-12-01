import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CLButtonSecondary } from "../../Buttons/CLButtons"
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider'
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
      <CLButtonSecondary className="cancel-x-icon-button" onClick={handleOpen} width={"180px"}>
       <XMarkIcon className="cancel-x-icon"/>
        <p>Cancel</p>
      </CLButtonSecondary>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-content">
          <ExclamationCircleIcon className="exclamation-circle-icon"/>
          <p className="modal-description">
            Are you sure you would like to cancel without saving?
          </p>
          <Divider className="confirm-cancel-modal-divider"/>
          <div className="confirm-cancel-modal-buttons-container">
            <button className="confirm-cancel-without-saving-button" onClick={handleConfirm}>
              Confirm
            </button>
            <CLButtonSecondary onClick={handleClose} width={"330px"}>
              Cancel
            </CLButtonSecondary>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
