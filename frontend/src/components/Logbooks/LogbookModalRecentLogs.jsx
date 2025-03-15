import "./LogbookModalRecentLogs.css";
import {
    ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { fetchData } from "../../utils/helpers/fetchData";

export default function LogbookModalRecentLogs({ logbookID }) {

    const { session } = useAuth();
    const [logs, setLogs] = useState([]);

    async function fetchLogs() {
        const response = await fetchData(session?.access_token, `logbooks/${logbookID}/logs`);
        setLogs(response);
        console.log(response);
    }

    useEffect(() => {
        fetchLogs();
    }, [])

    return (
        <div className="modal-recent-logs">
            <div className="recent-logs-header">
                <h2>Recent Logs</h2>
                <div className="recent-logs-title-buttons">
                    <div className="recent-log-download-button">Download <ArrowDownTrayIcon/></div>
                    <div className="recent-log-view-more-button">View more</div>
                </div>
            </div>
            <LogsTable logs={logs.slice(-10)}/>
        </div>
    )

}

const LogsTable = ({ logs }) => {
    return (
        <div className="recent-logs-table">
            <table>
                <tbody>
                {logs.map((log) => (
                    <tr key={log.id}>
                    <td>{log.id}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};