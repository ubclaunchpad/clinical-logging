import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CLButtonPrimary } from "../../Buttons/CLButtons";
import {
  XMarkIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./AddLogbookModal.css";
import { postData } from "../../../utils/helpers/postData";
import { useAuth } from "../../../contexts/AuthContext";

export const AddLogbookModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [logbookName, setLogbookName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [logbookType, setlogbookType] = useState('Select an option');
  const { session } = useAuth();

  const options = ['adult_cardiac_logs', 'congenital_surgery_logs', 'general_surgery_logs','gyn_logs','ob_logs'];

  const handleSelect = (option) => {
    setlogbookType(option);
    setIsOpen(false);
  };

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
        <label className='modal-input'>Logbook Name*
          <input
            type="text"
            value={logbookName}
            required
            placeholder="Enter a name for your new logbook"
            onChange={(e) => setLogbookName(e.target.value)}
          />
        </label>
        <div className="logbook-type-wrapper">
        <label className='modal-input'>Logbook Type*</label>
          <button onClick={() => setIsOpen(!isOpen)} className="logbook-type-button">
            {logbookType} 
            <ChevronDownIcon
              className={`down-icon ${isOpen ? "down-icon-active" : ""}`}
            />
          </button>
          {isOpen && (
            <div className="logbook-type-dropdown">
              {options.map(option => (
                <button
                  key={option}
                  className="logbook-type-item"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        <CLButtonPrimary
          className="add-logbook-button"
          onClick={handleAddLogbook}
          width={"330px"}
        >
          <p>Add Logbook</p>
        </CLButtonPrimary>
      </Box>
    </Modal>
  );
};
