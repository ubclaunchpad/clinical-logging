import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GetStartedCard from "./LeftSection/GetStartedCard";
import LogbooksCard from "./RightSection/LogbooksCard";
import ShopBooksCard from "./LeftSection/ShopBooksCard";
import RecentActivityCard from "./LeftSection/RecentActivityCard";
import "./MainContent.css";

export default function MainContent() {
  const navigate = useNavigate();
  const [setSelectedLog] = useState(null);

  const handleAddLogbook = () => {
    navigate("/home");
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
  );
}

function BottomSection({ recentActivities }) {
  return (
    <div className="bottom-section">
      <ShopBooksCard />
      <RecentActivityCard recentActivities={recentActivities} />
    </div>
  );
}
