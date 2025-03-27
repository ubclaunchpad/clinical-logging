import "./LogbookModalRecentLogs.css";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function LogbookModalRecentLogs({ logs }) {
  return (
    <div className="modal-recent-logs">
      <div className="recent-logs-header">
        <h2>Recent Logs</h2>
        <div className="recent-logs-title-buttons">
          <div className="recent-log-download-button">
            Download <ArrowDownTrayIcon />
          </div>
          <div className="recent-log-view-more-button">View more</div>
        </div>
      </div>
      <LogsTable logs={logs.slice(-10)} />
    </div>
  );
}

const LogsTable = ({ logs }) => {
  return (
    <div className="recent-logs-table">
      <table>
        <thead>
          <tr>
            <td>Select Log</td>
            <td>Case No</td>
            <td>Title</td>
            <td>Surgeon</td>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td><input type="checkbox"/></td>
              <td>{log.case_no}</td>
              <td>{log.title}</td>
              <td>{log.surgeon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
