import Navbar from "../components/Navbar/Navbar";
import { CLButtonPrimary, CLButtonSecondary } from "../components/Buttons/CLButtons";
import { useNavigate } from "react-router-dom";
import "./styles/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content">
        <MainContent />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div>
      <p>
        Convert handwritten clinical logs to a <br />
        standardized Excel template with just a click of a button!
      </p>
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
      <CLButtonPrimary onClick={handleCreateNewLog} width={"332px"}>
        Create New Log
      </CLButtonPrimary>
      <CLButtonSecondary onClick={handleViewHistory} width={"332px"}>
        View Log History
      </CLButtonSecondary>
    </div>
  );
}
