import { useState, useEffect } from "react";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import LogTable from "../../components/LogHistory/LogTable";
import Pagination from "../../components/LogHistory/Pagination";
import {
  // PencilSquareIcon,
  ArrowDownTrayIcon,
  // AdjustmentsHorizontalIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import "./LogHistory.css";
import { useAuth } from "../../contexts/AuthContext";
import { fetchData } from "../../utils/helpers/fetchData";
import supabase from "../../config/supabase";
import { useNavigate } from "react-router-dom";

const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const csvHeader = headers.join(',');
  const csvRows = data.map(row => 
    headers.map(header => {
      let cell = row[header] || '';
      // Handle cells that contain commas by wrapping in quotes
      if (cell.toString().includes(',')) {
        cell = `"${cell}"`;
      }
      return cell;
    }).join(',')
  );
  return [csvHeader, ...csvRows].join('\n');
};

export default function LogHistory() {
  return (
    <NavContentWrapper>
      <div className=".loghistory-container">
        <MainContent />
      </div>
    </NavContentWrapper>
  );
}

function MainContent() {
  const navigate = useNavigate();
  
  /** Retrieve user's logs from API */
  const [logs, setLogs] = useState([]);
  const { session } = useAuth();

  async function fetchLogs() {
    const response = await fetchData(session?.access_token, "logs");
    setLogs(response)
  };

  useEffect(() => {
    fetchLogs();
  }, []);

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

  const handleDownloadLog = async (selectedLogs) => {
    try {
      
      const selectedLogIds = Object.entries(selectedLogs)
        .filter(([, isSelected]) => isSelected)
        .map(([id]) => id);

      if (selectedLogIds.length === 0) return;

      const selectedLogData = logs.filter(log => selectedLogIds.includes(log.id));
      
      const csvContent = convertToCSV(selectedLogData);
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `selected_logs_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading logs:', error);
    }
  };

  const handleDeleteLog = async (selectedLogs) => {
    try {
      const selectedLogIds = Object.entries(selectedLogs)
        .filter(([, isSelected]) => isSelected)
        .map(([id]) => id);

      if (selectedLogIds.length === 0) return;

      const selectedLogData = logs.filter(log => selectedLogIds.includes(log.id));
      
      for (const log of selectedLogData) {
        const { error } = await supabase
          .from(log.type)
          .delete()
          .eq('id', log.id);
          
        if (error) throw error;
      }

      // Refresh the logs list
      fetchLogs();
    } catch (error) {
      console.error('Error deleting logs:', error);
    }
  };

  const handleViewLog = async (selectedLogs) => {
    const selectedLogIds = Object.entries(selectedLogs)
      .filter(([, isSelected]) => isSelected)
      .map(([id]) => id);

    if (selectedLogIds.length === 0) {
      alert("Please select a log to view/edit");
      return;
    }
    if (selectedLogIds.length > 1) {
      alert("Please select only one log to view/edit");
      return;
    }

    const selectedLog = logs.find(log => log.id === selectedLogIds[0]);
    console.log(selectedLog);
    if (selectedLog) {
      navigate("/manualEntry", { 
        state: {
          initialData: selectedLog ,
          logbookId: selectedLog.logbook_id,
          logData: selectedLog,
          isEditing: true 
        } 
      });
    }
  };

  /** Array of log actions */
const logActions = [
  // {
  //   label: "Configure",
  //   icon: PencilSquareIcon,
  //   onClick: () => {},
  // },
  {
    label: "Download",
    icon: ArrowDownTrayIcon,
    onClick: () => handleDownloadLog(selectedLogs),
  },
  // {
  //   label: "Filter",
  //   icon: AdjustmentsHorizontalIcon,
  //   onClick: () => {},
  // },
  {
    label: "View",
    icon: EyeIcon,
    onClick: () => handleViewLog(selectedLogs),
  },
  {
    label: "Delete",
    icon: TrashIcon,
    onClick: () => handleDeleteLog(selectedLogs),
  },
];

  /** Check if all current logs are selected */
  const allSelected = currentLogs.every((log) => selectedLogs[log.id]);

  return (
    <div className="table-container">
      <ContentHeader
        header="Saved Logs"
        primaryButtonText="Add Logs"
        actions={logActions}
        addAction={()=>{}}
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
