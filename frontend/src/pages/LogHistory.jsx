import { useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import TopNav from "../components/TopNav/TopNav";
import Navbar from "../components/Navbar/Navbar";
import ContentHeader from "../components/ContentHeader/ContentHeader";
import "./styles/LogHistory.css";

export default function LogHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [logs] = useState([
    {
      id: 1,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 2,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 3,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 4,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 5,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 6,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 7,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 8,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 9,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 10,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 11,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 12,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 13,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 14,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 15,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 16,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 17,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 18,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 19,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
    {
      id: 20,
      title: "mylogexample",
      type: "TypeExample",
      dateCreated: "TypeExample",
    },
  ]);
  const [selectedLogs, setSelectedLogs] = useState(new Set());

  const logsPerPage = 7; // Number of logs shown per page
  const totalPages = Math.ceil(logs.length / logsPerPage);

  // Calculate which logs to display based on current page
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const startRange = (currentPage - 1) * logsPerPage + 1;
  const endRange = Math.min(currentPage * logsPerPage, logs.length);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle select all checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      // Select all visible logs
      const newSelected = new Set(selectedLogs);
      currentLogs.forEach((log) => newSelected.add(log.id));
      setSelectedLogs(newSelected);
    } else {
      // Deselect all visible logs
      const newSelected = new Set(selectedLogs);
      currentLogs.forEach((log) => newSelected.delete(log.id));
      setSelectedLogs(newSelected);
    }
  };

  // Handle individual checkbox
  const handleSelectLog = (logId) => {
    const newSelected = new Set(selectedLogs);
    if (newSelected.has(logId)) {
      newSelected.delete(logId);
    } else {
      newSelected.add(logId);
    }
    setSelectedLogs(newSelected);
  };

  return (
    <div className="page-container">
      <TopNav />
      <Navbar />
      <ContentHeader />
      <div className="table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th className="checkbox-column">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={currentLogs.every((log) => selectedLogs.has(log.id))}
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
              <tr
                key={log.id}
                className={selectedLogs.has(log.id) ? "selected" : ""}
              >
                <td className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={selectedLogs.has(log.id)}
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
            {[...Array(totalPages)].map((_, index) => (
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
    </div>
  );
}
