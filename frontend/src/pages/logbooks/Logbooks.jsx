import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import LogbookCard from "../../components/Logbooks/LogbookCard";
import AddLogbookCard from "../../components/Logbooks/AddLogbookCard";
import { AddLogbookModal } from "../../components/Modals/AddLogbookModal/AddLogbookModal";
import "./Logbooks.css";
import {
  PencilSquareIcon,
  ArrowDownTrayIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { fetchData } from "../../utils/helpers/fetchData";
import { useLocation } from "react-router-dom";

export default function Logbooks() {
  /** Retrieve user's logbooks from API */
  const [logbooks, setLogbooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { session } = useAuth();
  const location = useLocation();

  async function fetchLogbooks() {
    const response = await fetchData(session?.access_token, "logbooks");
    setLogbooks(response);
  }

  /** Array of logbook actions */
  const logbookActions = [
    {
      label: "Configure",
      icon: PencilSquareIcon,
      onClick: () => {},
    },
    {
      label: "Download",
      icon: ArrowDownTrayIcon,
      onClick: () => {},
    },
    {
      label: "Filter",
      icon: AdjustmentsHorizontalIcon,
      onClick: () => {},
    },
    {
      label: "View",
      icon: EyeIcon,
      onClick: () => {},
    },
    {
      label: "Delete",
      icon: TrashIcon,
      onClick: () => {},
    },
  ];

  useEffect(() => {
    fetchLogbooks();
  }, [showModal]);

  useEffect(() => {
    if (location.state?.openAddModal) {
      setShowModal(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <NavContentWrapper>
      <div className="logbooks-container">
        <ContentHeader
          header="Logbooks"
          primaryButtonText="Add Book"
          actions={logbookActions}
        />
        <AddLogbookModal open={showModal} onClose={() => setShowModal(false)} />
        <div className="logbooks-grid">
          {logbooks.map((book, index) => (
            <LogbookCard key={index} {...book} />
          ))}
          <AddLogbookCard onClick={() => setShowModal(true)} />
        </div>
      </div>
    </NavContentWrapper>
  );
}
