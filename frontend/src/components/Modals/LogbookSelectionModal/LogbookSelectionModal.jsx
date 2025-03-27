import { useState, useEffect } from "react";
import { CLButtonPrimary } from "../../Buttons/CLButtons";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { NewLogModal } from "../NewLogModal/NewLogModal";
import { useAuth } from "../../../contexts/AuthContext";
import "./LogbookSelectionModal.css";

export const LogbookSelectionModal = () => {
  const { session } = useAuth();
  const [logbooks, setLogbooks] = useState([]);
  const [openSelection, setOpenSelection] = useState(false);
  const [selectedLogbook, setSelectedLogbook] = useState(null);
  const [showNewLogModal, setShowNewLogModal] = useState(false);

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

  const formatLogbookType = (type) => {
    if (!type) return "Untitled Logbook";
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace("Logs", "");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
          <p className="modal-description">
            Select a logbook to create a new log
          </p>
          <Divider className="logbook-modal-divider" />
          <div className="logbook-list">
            {logbooks.length === 0 ? (
              <div className="empty-state">No logbooks found</div>
            ) : (
              logbooks.map((logbook) => (
                <button
                  key={logbook.id}
                  className="logbook-item"
                  onClick={() => {
                    setSelectedLogbook(logbook);
                    setOpenSelection(false);
                    setShowNewLogModal(true);
                  }}
                >
                  <div className="logbook-info">
                    <h3 className="logbook-name">
                      {formatLogbookType(logbook.type)}
                    </h3>
                    <div className="logbook-details">
                      <span className="logbook-date">
                        Created: {formatDate(logbook.created)}
                      </span>
                      <span className="logbook-capacity">
                        {logbook.storage || 0} / {100} logs
                      </span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
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
    </div>
  );
};
