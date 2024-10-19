import React from "react";
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="page-container">
            <div className="sidebar">
                <Logo />
            </div>
            <div className="main-content">
                <MainContent />
            </div>
        </div>

    );

    function Logo() {
        return (
            <div className="sidebar-logo-container">
            <span className="sidebar-logo-text-bold">
            FlowLeaflets <br />
            </span>
            <span className="sidebar-logo-text-small">Clinical Logbooks</span>
            </div>
        );
    }

    function MainContent() {
        return (
            <div className="main-content-text">
                <span>
                Convert handwritten clincial logs to a <br />
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
                    <AddIcon className="add-icon"/>
                    Create New Log
                </button>
                <button onClick={handleViewHistory}>
                    <HistoryIcon className="add-icon"/>
                    View Log History
                </button>
            </div>
        );
    }
}