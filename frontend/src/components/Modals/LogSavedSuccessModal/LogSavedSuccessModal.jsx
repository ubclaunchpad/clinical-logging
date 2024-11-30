import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { CLButtonPrimary, CLButtonSecondary } from "../../Buttons/CLButtons"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider'
import { ClockIcon, HomeIcon, BookmarkSquareIcon } from '@heroicons/react/24/outline';
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
      <CLButtonPrimary onClick={handleOpen} width={"330px"}>
       <BookmarkSquareIcon />
        <p>Create New Log</p>
      </CLButtonPrimary>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-content">
          <Typography variant="h6" component="h2">
            Congratulations!
          </Typography>
          <Typography>Your new log &quot;MyExampleLog&quot; has been saved to log history.</Typography>
          <Divider />
          <CLButtonPrimary className="see-log-history-button" onClick={handleLogHistory} width={"330px"}>
            <ClockIcon className="modal-icon" />
            <p>See Log History</p>
          </CLButtonPrimary>
          <CLButtonSecondary className="back-home-button" onClick={handleBackHome} width={"330px"}>
            <HomeIcon className="modal-icon" />
            <p>Back to Home</p>
          </CLButtonSecondary>
        </Box>
      </Modal>
    </div>
  );
}
