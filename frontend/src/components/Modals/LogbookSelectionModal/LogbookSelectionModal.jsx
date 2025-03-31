import { useState, useEffect } from "react";
import { CLButtonPrimary } from "../../Buttons/CLButtons";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { NewLogModal } from "../NewLogModal/NewLogModal";
import { AddLogbookModal } from "../AddLogbookModal/AddLogbookModal";
import { useAuth } from "../../../contexts/AuthContext";
import "./LogbookSelectionModal.css";

export const LogbookSelectionModal = () => {
  const { session } = useAuth();
  const [logbooks, setLogbooks] = useState([]);
  const [openSelection, setOpenSelection] = useState(false);
  const [selectedLogbook, setSelectedLogbook] = useState(null);
  const [showNewLogModal, setShowNewLogModal] = useState(false);
  const [showAddLogbookModal, setShowAddLogbookModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (openSelection && session?.access_token) {
      fetch("/api/logbooks", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setLogbooks(data.data))
        .catch(() => setLogbooks([]));
    }
  }, [openSelection, session?.access_token]);

  const formatLogbookType = (type, title) => {
    if (!type) return "Untitled Logbook";

    const formattedType = type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace("Logs", "");

    return `${formattedType} - ${title}`;
  };

  return (
    <div>
      <CLButtonPrimary onClick={() => setOpenSelection(true)} width={"330px"}>
        Create New Log
      </CLButtonPrimary>

      <Modal open={openSelection} onClose={() => setOpenSelection(false)}>
        <Box className="modal-content">
          <button
            className="close-modal-button"
            onClick={() => setOpenSelection(false)}
          >
            <XMarkIcon className="close-x-icon" />
          </button>
          <h2 className="modal-title">Logbook Selection</h2>
          <Divider className="logbook-title-divider" />
          <p className="modal-logbook-description">
            Please select a logbook from your current collection:
          </p>

          {logbooks.length > 0 ? (
            <div className="logbook-selector">
              <div
                className={`logbook-selector__button ${
                  selectedLogbook ? "selected" : ""
                }`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setDropdownOpen(!dropdownOpen);
                  }
                }}
              >
                {selectedLogbook
                  ? formatLogbookType(
                      selectedLogbook.type,
                      selectedLogbook.title
                    )
                  : "Select"}
                <span className="logbook-selector__icon">
                  {dropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </span>
              </div>
              {dropdownOpen && (
                <div className="logbook-selector__dropdown">
                  {logbooks.map((logbook) => (
                    <div
                      key={logbook.id}
                      className="logbook-selector__option"
                      onClick={() => {
                        setSelectedLogbook(logbook);
                        setDropdownOpen(false);
                      }}
                    >
                      {formatLogbookType(logbook.type, logbook.title)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="no-logbooks">
              <p>No logbooks found.</p>
              <CLButtonPrimary
                onClick={() => {
                  setOpenSelection(false);
                  setShowAddLogbookModal(true);
                }}
                width={"230px"}
                height={"45px"}
                className="add-logbook-btn"
              >
                Add Logbook
              </CLButtonPrimary>
            </div>
          )}

          {logbooks.length > 0 && (
            <div className="modal-actions">
              <CLButtonPrimary
                onClick={() => {
                  if (selectedLogbook) {
                    setOpenSelection(false);
                    setShowNewLogModal(true);
                  }
                }}
                disabled={!selectedLogbook}
                width={"230px"}
                height={"45px"}
              >
                Continue
              </CLButtonPrimary>
            </div>
          )}
        </Box>
      </Modal>

      {showNewLogModal && (
        <NewLogModal
          open={showNewLogModal}
          onClose={() => {
            setShowNewLogModal(false);
            setSelectedLogbook(null);
          }}
          logbook={selectedLogbook}
        />
      )}

      {showAddLogbookModal && (
        <AddLogbookModal
          open={showAddLogbookModal}
          onClose={() => setShowAddLogbookModal(false)}
        />
      )}
    </div>
  );
};
