import { NavContentWrapper } from "../components/NavContentWrapper/NavContentWrapper";
import { CLButtonPrimary, CLButtonSecondary } from "../components/Buttons/CLButtons";
import { useNavigate } from "react-router-dom";
import "./styles/Homepage.css";

export default function Home() {
  return (
    <NavContentWrapper>
      <MainContent />
    </NavContentWrapper>
  );
}

function MainContent() {
  return (
    <div className="main-content">
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

  const handleAddLogbook = () => {
    navigate("uploadPhotos")
  }

  const handleViewHistory = () => {
    navigate("/logHistory");
  };

  return (
    <div className="buttons-container">
      <CLButtonPrimary onClick={handleCreateNewLog} width={"330px"}>
        Create New Log
      </CLButtonPrimary>
      <CLButtonSecondary onClick={handleAddLogbook} width={"330px"}>
        Add Logbook
      </CLButtonSecondary>
      <CLButtonSecondary onClick={handleViewHistory} width={"330px"}>
        View Log History
      </CLButtonSecondary>
    </div>
  );
}
