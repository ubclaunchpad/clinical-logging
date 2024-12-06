import { useState } from "react";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import LogTable from "../../components/LogHistory/LogTable";
import Pagination from "../../components/LogHistory/Pagination";
import {
  PencilSquareIcon,
  ArrowDownTrayIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import "./LogHistory.css";

/** Array of log actions */
const logActions = [
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

export default function LogHistory() {
  return (
    <NavContentWrapper>
      <MainContent />
    </NavContentWrapper>
  );
}

function MainContent() {
  /** Generate logs data dynamically */
  const logs = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Log Title ${index + 1}`,
    type: `Type ${(index % 5) + 1}`,
    dateCreated: `2024-11-${(index % 30) + 1}`,
  }));

  /** State for current page and selected logs */
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLogs, setSelectedLogs] = useState({});

  /** Constants for pagination */
  const logsPerPage = 7;
  const totalPages = Math.ceil(logs.length / logsPerPage);

  /** Calculate logs to display on current page */
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  /** Calculate range for display */
  const startRange = indexOfFirstLog + 1;
  const endRange = Math.min(indexOfLastLog, logs.length);

  /** Handlers for pagination */
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /** Handlers for log selection */
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const newSelectedLogs = { ...selectedLogs };
    currentLogs.forEach((log) => {
      newSelectedLogs[log.id] = isChecked;
    });
    setSelectedLogs(newSelectedLogs);
  };

  const handleSelectLog = (logId) => {
    setSelectedLogs((prevSelected) => ({
      ...prevSelected,
      [logId]: !prevSelected[logId],
    }));
  };

  /** Check if all current logs are selected */
  const allSelected = currentLogs.every((log) => selectedLogs[log.id]);

  return (
    <div className="table-container">
      <ContentHeader
        header="Logbook"
        primaryButtonText="Add Logs"
        actions={logActions}
      />
      <LogTable
        currentLogs={currentLogs}
        selectedLogs={selectedLogs}
        handleSelectAll={handleSelectAll}
        handleSelectLog={handleSelectLog}
        allSelected={allSelected}
      />
      <div className="table-footer">
        <div className="showing-text">
          Showing <span>{startRange}</span>-<span>{endRange}</span> of{" "}
          {logs.length} logs
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          handlePageClick={handlePageClick}
        />
      </div>
    </div>
  );
}
