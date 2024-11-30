import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CLButtonPrimary, CLButtonSecondary } from "../../Buttons/CLButtons"
import {
  ClockIcon,
  HomeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import './LogSavedSuccessModal.css'

export const LogSavedSuccessModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleLogHistory = () => {
    navigate('/logHistory');
  }

  const handleBackHome = () => {
    navigate('/homepage');
  }

  return (
    <div>
      <CLButtonPrimary className="save-icon-button" onClick={handleOpen} width={"330px"}>
       <SaveOutlinedIcon className="save-icon" />
        <p>Create New Log</p>
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
            Congratulations!
          </p>
          <Divider className="log-saved-success-modal-divider"/>
          <p>Your new log &quot;MyExampleLog&quot; has been saved to log history.</p>
          <div className="log-saved-success-modal-buttons-container">
            <CLButtonPrimary className="see-log-history-button" onClick={handleLogHistory} width={"330px"}>
              <ClockIcon className="modal-icon" />
              <p>See Log History</p>
            </CLButtonPrimary>
            <CLButtonSecondary className="back-home-button" onClick={handleBackHome} width={"330px"}>
              <HomeIcon className="modal-icon" />
              <p>Back to Home</p>
            </CLButtonSecondary>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
