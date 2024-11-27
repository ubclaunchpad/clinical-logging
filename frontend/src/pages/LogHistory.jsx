import { useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import SearchFilterSort from "../components/LogHistory/SearchFilterSort";
import LogTable from "../components/LogHistory/LogTable";
import Pagination from "../components/LogHistory/Pagination";
import "./styles/LogHistory.css";

const LogHistory = () => {
  const initialLogs = [
    {
      id: 1,
      title: "Patient A - Weekly Checkup",
      dateOfOperation: "2023-09-25",
      date: "2023-10-01",
      patientName: "Patient A",
    },
    {
      id: 2,
      title: "Patient B - Medication Update",
      dateOfOperation: "2024-08-15",
      date: "2024-09-20",
      patientName: "Patient B",
    },
    {
      id: 3,
      title: "Patient C - Initial Consultation",
      dateOfOperation: "2024-06-12",
      date: "2024-06-18",
      patientName: "Patient C",
    },
    {
      id: 4,
      title: "Patient D - Follow-Up",
      dateOfOperation: "2023-12-10",
      date: "2023-12-15",
      patientName: "Patient D",
    },
    {
      id: 5,
      title: "Patient E - Blood Test Results",
      dateOfOperation: "2023-11-18",
      date: "2023-11-21",
      patientName: "Patient E",
    },
    {
      id: 6,
      title: "Patient F - Surgery Post-Op",
      dateOfOperation: "2024-01-05",
      date: "2024-01-10",
      patientName: "Patient F",
    },
    {
      id: 7,
      title: "Patient G - Annual Checkup",
      dateOfOperation: "2024-02-20",
      date: "2024-02-28",
      patientName: "Patient G",
    },
    {
      id: 8,
      title: "Patient H - Consultation",
      dateOfOperation: "2024-03-10",
      date: "2024-03-15",
      patientName: "Patient H",
    },
    {
      id: 9,
      title: "Patient I - Physical Therapy",
      dateOfOperation: "2023-05-01",
      date: "2023-05-05",
      patientName: "Patient I",
    },
    {
      id: 10,
      title: "Patient J - MRI Results",
      dateOfOperation: "2024-03-25",
      date: "2024-04-01",
      patientName: "Patient J",
    },
  ];

  const [logs] = useState(initialLogs);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 3;

  // New states for Date of Operation and Patient Name filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [patientName, setPatientName] = useState("");

  // Filter and sort functionality
  const filteredLogs = logs
    .filter((log) => {
      // Title filter
      const matchesSearch = log.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesPatientFilter = filter === "" || log.patientName === filter;

      // Date of Operation filter
      const matchesDateRange =
        (!startDate || new Date(log.dateOfOperation) >= new Date(startDate)) &&
        (!endDate || new Date(log.dateOfOperation) <= new Date(endDate));

      // Patient Name filter
      const matchesPatientName =
        !patientName ||
        log.patientName.toLowerCase().includes(patientName.toLowerCase());

      return (
        matchesSearch &&
        matchesPatientFilter &&
        matchesDateRange &&
        matchesPatientName
      );
    })
    .sort((a, b) => {
      if (sort === "date") return new Date(b.date) - new Date(a.date);
      if (sort === "alphabetical") return a.title.localeCompare(b.title);
      return 0;
    });

  // Paginate logs
  const startIndex = (currentPage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(
    startIndex,
    startIndex + logsPerPage
  );

  return (
    <div className="log-history-container">
      <Navbar />
      <div className="container">
        <div>
          <SearchFilterSort
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            patientName={patientName}
            setPatientName={setPatientName}
          />
          <LogTable logs={paginatedLogs} />
          <Pagination
            currentPage={currentPage}
            totalLogs={filteredLogs.length}
            logsPerPage={logsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default LogHistory;
