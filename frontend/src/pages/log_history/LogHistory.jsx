import { useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import "./LogHistory.css";

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
      <ContentHeader />
      <table className="logs-table">
        <thead>
          <tr>
            <th className="checkbox-column">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={allSelected}
              />
            </th>
            <th className="log-title-column">
              LOG TITLE <ChevronUpDownIcon className="sort-icon" />
            </th>
            <th className="type-column">
              TYPE <ChevronUpDownIcon className="sort-icon" />
            </th>
            <th className="date-column">
              DATE CREATED <ChevronUpDownIcon className="sort-icon" />
            </th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log) => (
            <tr key={log.id} className={selectedLogs[log.id] ? "selected" : ""}>
              <td className="checkbox-column">
                <input
                  type="checkbox"
                  checked={!!selectedLogs[log.id]}
                  onChange={() => handleSelectLog(log.id)}
                />
              </td>
              <td className="log-title-column title-column">{log.title}</td>
              <td className="type-column">{log.type}</td>
              <td className="date-column">{log.dateCreated}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <div className="showing-text">
          Showing <span>{startRange}</span>-<span>{endRange}</span> of{" "}
          {logs.length} logs
        </div>
        <div className="pagination">
          {currentPage > 1 && (
            <span className="previous" onClick={handlePreviousPage}>
              Previous
            </span>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index + 1}
              className={
                currentPage === index + 1 ? "current-page" : "page-number"
              }
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          {currentPage < totalPages && (
            <span className="next" onClick={handleNextPage}>
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
