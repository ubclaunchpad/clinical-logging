import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import "./LogTable.css";

const LogTable = ({ logs }) => (
  <div className="log-table-container">
    <table className="log-table">
      <thead>
        <tr>
          <th className="log-title-cell">Log Title</th>
          <th className="date-operation-cell">Date of Operation</th>
          <th className="date-created-cell">Date Created</th>
          <th className="actions-cell">Actions</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td className="log-title-cell">{log.title}</td>
            <td className="date-operation-cell">{log.dateOfOperation}</td>
            <td className="date-created-cell">{log.date}</td>
            <td className="actions-cell">
              <button className="action-button">
                <DownloadIcon />
              </button>
              <button className="action-button">
                <VisibilityIcon />
              </button>
              <button className="action-button">
                <DeleteIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LogTable;
