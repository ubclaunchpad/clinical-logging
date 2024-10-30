import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalLogs, logsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalLogs / logsPerPage);
  const startLog = (currentPage - 1) * logsPerPage + 1;
  const endLog = Math.min(startLog + logsPerPage - 1, totalLogs);

  return (
    <div className="pagination">
      <span>
        Showing {startLog} to {endLog} of {totalLogs} logs
      </span>
      <div className="page-buttons">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
