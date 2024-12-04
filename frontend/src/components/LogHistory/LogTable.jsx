import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import "./LogTable.css";

export default function LogTable({
  currentLogs,
  selectedLogs,
  handleSelectAll,
  handleSelectLog,
  allSelected,
}) {
  return (
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
  );
}
