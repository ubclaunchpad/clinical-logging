import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetStartedCard from "./LeftSection/GetStartedCard";
import LogbooksCard from "./RightSection/LogbooksCard";
import ShopBooksCard from "./LeftSection/ShopBooksCard";
import RecentActivityCard from "./LeftSection/RecentActivityCard";
import "./MainContent.css";
import { useAuth } from "../../contexts/AuthContext";
import { fetchData } from "../../utils/helpers/fetchData";


export default function MainContent() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [setSelectedLog] = useState(null);
  const [progressItems, setProgressItems] = useState([]);

  useEffect(() => {
    const fetchProgressItems = async () => {
      const response = await fetchData(session?.access_token, "logbooks");
      console.log(response);
      for (const item of response) {
        setProgressItems((prevItems) => [...prevItems, {
          id: item.id,
          name: item.title,
          progress: item.storage,
        }]);
      }
    };
    fetchProgressItems();
  }, []);

  const handleAddLogbook = () => {
    navigate("/logbooks", { state: { openAddModal: true } });
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
