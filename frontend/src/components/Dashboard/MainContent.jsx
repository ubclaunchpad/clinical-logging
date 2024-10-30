import React from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import "./MainContent.css";

export default function MainContent() {
  return (
    <div className="main-content-text">
      <span>
        Convert handwritten clinical logs to a <br />
        standardized Excel template with just a click of a button!
      </span>
      <div className="main-content-buttons">
        <Buttons />
      </div>
    </div>
  );
}

function Buttons() {
  const navigate = useNavigate();

  const handleCreateNewLog = () => {
    navigate("/newLog");
  };

  const handleViewHistory = () => {
    navigate("/logHistory");
  };

  return (
    <div className="buttons-container">
      <button onClick={handleCreateNewLog}>
        <AddIcon className="add-icon" />
        Create New Log
      </button>
      <button onClick={handleViewHistory}>
        <HistoryIcon className="add-icon" />
        View Log History
      </button>
    </div>
  );
}
