import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import WelcomeSection from "../Header/WelcomeSection";
import GetStartedCard from "./GetStartedCard";
import BottomSection from "./BottomSection";
import LogbooksCard from "../RightSection/LogbooksCard";
import "./MainContent.css";

export default function MainContent() {
  const navigate = useNavigate();
  const [setSelectedLog] = useState(null);
  const { session } = useAuth();

  const handleAddLogbook = () => {
    navigate("/newLog");
  };

  const handleViewHistory = () => {
    navigate("/history");
  };

  const recentActivities = [
    {
      id: 1,
      action: "Added Log",
      logName: "mylogexample",
      time: "1d",
    },
    {
      id: 2,
      action: "Added Log",
      logName: "mylogexample",
      time: "1d",
    },
    {
      id: 3,
      action: "Added Log",
      logName: "mylogexample",
      time: "1d",
    },
    // Add more items as needed
  ];

  const progressItems = [
    {
      id: 1,
      name: "Adult Cardiac 2025",
      progress: 65,
    },
    {
      id: 2,
      name: "Adult Cardiac 2025",
      progress: 65,
    },
    {
      id: 3,
      name: "Adult Cardiac 2025",
      progress: 65,
    },
    // Add more items as needed
  ];

  return (
    <div className="dashboard-container">
      <WelcomeSection
        firstName={session?.user?.user_metadata?.first_name || "User"}
      />

      <div className="content-grid">
        <div>
          <GetStartedCard
            handleAddLogbook={handleAddLogbook}
            handleViewHistory={handleViewHistory}
          />

          <BottomSection recentActivities={recentActivities} />
        </div>

        <LogbooksCard
          progressItems={progressItems}
          setSelectedLog={setSelectedLog}
        />
      </div>
    </div>
  );
}
