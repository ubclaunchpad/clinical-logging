import React, { useState } from "react";
import "./SearchFilterSort.css";

const SearchFilterSort = ({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  patientName,
  setPatientName,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="search-filter-sort">
      <input
        type="text"
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Sort By dropdown comes before Filters button */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="sort-dropdown"
      >
        <option value="">Sort By</option>
        <option value="date">Date</option>
        <option value="alphabetical">Alphabetical</option>
      </select>

      <button onClick={toggleDropdown} className="filter-button">
        Filters {isDropdownOpen ? "▲" : "▼"}
      </button>

      {/* Dropdown Menu for Advanced Filters */}
      {isDropdownOpen && (
        <div className="filter-dropdown">
          <div className="filter-group">
            <label>Date of Operation:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Patient Name:</label>
            <input
              type="text"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilterSort;
