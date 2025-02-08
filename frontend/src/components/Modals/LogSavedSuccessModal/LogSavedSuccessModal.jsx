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

export const LogSavedSuccessModal = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleLogHistory = () => {
    navigate('/history');
  }

  const handleBackHome = () => {
    navigate('/home');
  }

  const handleSaveOnClick = async () => {
    // TODO: add loading indicator?
    await onSubmit();
    handleOpen();
  }

  return (
    <div>
      <CLButtonPrimary className="save-icon-button" onClick={handleSaveOnClick} width={"240px"}>
       <SaveOutlinedIcon className="save-icon" />
        <p>Save to Log History</p>
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
