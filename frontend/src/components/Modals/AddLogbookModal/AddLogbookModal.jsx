import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CLButtonPrimary } from "../../Buttons/CLButtons";
import {
  XMarkIcon
} from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./AddLogbookModal.css";
import { postData } from "../../../utils/helpers/postData";
import { useAuth } from "../../../contexts/AuthContext";

export const AddLogbookModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [logbookName, setLogbookName] = useState("");
  const [logbookType, setLogbookType] = useState("");
  const { session } = useAuth();

  async function createLogbook() {
    await postData(session?.access_token, "logbooks", {type: logbookType, title: logbookName });
  }

  const handleAddLogbook = async () => {
    try {
      await createLogbook();
      onClose();
    } catch (error){
      console.log(error);
    }
  }


  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-content">
        <button className="close-modal-button" onClick={onClose}>
          <XMarkIcon className="close-x-icon" />
        </button>
        <p className="modal-description">
          Add a New Logbook
        </p>
        <label>Logbook Name*:
          <input
            type="text"
            value={logbookName}
            required
            placeholder="Enter a name for your new logbook"
            onChange={(e) => setLogbookName(e.target.value)}
          />
        </label>
        <label>Logbook Type*:
          <input
            type="text"
            value={logbookType}
            required
            placeholder="Enter the code printed on your logbook"
            onChange={(e) => setLogbookType(e.target.value)}
          />
        </label>
        
          <CLButtonPrimary
            className="upload-photo-button"
            onClick={handleAddLogbook}
            width={"330px"}
          >
            <p>Add Logbook</p>
          </CLButtonPrimary>
      </Box>
    </Modal>
  );
};
