import { useNavigate } from "react-router-dom";
import { CLButtonPrimary, CLButtonSecondary } from "../../Buttons/CLButtons";
import {
  PhotoIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import "./NewLogModal.css";

export const NewLogModal = ({ open, onClose, logbook }) => {
  const navigate = useNavigate();

  const handleUploadPhoto = () => {
    navigate("/uploadPhotos", { state: { logbookId: logbook.id } });
  };

  const handleCreateManually = () => {
    navigate("/manualEntry", { state: { logbookId: logbook.id } });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-content">
        <button className="close-modal-button" onClick={onClose}>
          <XMarkIcon className="close-x-icon" />
        </button>
        <p className="modal-description">
          How would you like to create a new log?
        </p>
        <Divider className="new-log-modal-divider" />
        <div className="new-log-modal-buttons-container">
          <CLButtonPrimary
            className="upload-photo-button"
            onClick={handleUploadPhoto}
            width={"330px"}
          >
            <PhotoIcon className="modal-icon" />
            <p>Upload Photo</p>
          </CLButtonPrimary>
          <CLButtonSecondary
            className="create-manually-button"
            onClick={handleCreateManually}
            width={"330px"}
          >
            <PencilSquareIcon className="modal-icon" />
            <p>Create Manually</p>
          </CLButtonSecondary>
        </div>
      </Box>
    </Modal>
  );
};
