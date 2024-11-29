import { useState } from "react";
import {
  CLButtonPrimary,
  CLButtonSecondary,
} from "../../components/Buttons/CLButtons";
import { useNavigate } from "react-router-dom";
import LogBooks from "../../assets/images/logbooks.png";
import ShopLogBooks from "../../assets/images/ShopLogBooks.png";
import { ChevronRightIcon, ClockIcon } from "@heroicons/react/24/outline";
import "./Home.css";
import { useAuth } from "../../contexts/AuthContext";
import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";

export default function Home() {
  return (
    <NavContentWrapper>
      <MainContent />
    </NavContentWrapper>
  );
}

function MainContent() {
  const navigate = useNavigate();
  const [setSelectedLog] = useState(null);
  const { session } = useAuth();

  const handleCreateNewLog = () => {
    navigate("/uploadPhotos");
  };

  const handleAddLogbook = () => {
    navigate("/newLog");
  };

  const handleViewHistory = () => {
    navigate("/history");
  };

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1>
          <span className="welcome-text">Welcome back, </span>
          <span className="user-name">
            {session?.user?.user_metadata?.first_name || "User"}
          </span>
        </h1>
      </div>

      <div className="content-grid">
        <div>
          <div className="get-started-card">
            <h2>Get Started</h2>
            <p>
              Convert handwritten clinical logs to standardized excel templates
              with just a click of a button!
            </p>
            <div className="button-stack">
              <CLButtonPrimary onClick={handleCreateNewLog} width={"230px"}>
                Create New Log
              </CLButtonPrimary>
              <CLButtonSecondary onClick={handleAddLogbook} width={"230px"}>
                Add Logbook
              </CLButtonSecondary>
              <CLButtonSecondary onClick={handleViewHistory} width={"230px"}>
                View Log History
              </CLButtonSecondary>
            </div>
          </div>

          <div className="bottom-section">
            <a href="/shop-logbooks" className="shop-books-link">
              <div className="shop-books-card">
                <h3>Shop Log Books</h3>
                <ChevronRightIcon className="chevron-icon" />
                <img
                  src={ShopLogBooks}
                  alt="Shop Log Books"
                  className="shop-books-image"
                />
              </div>
            </a>

            <a href="/recent-activity" className="recent-activity-link">
              <div className="recent-activity-card">
                <div className="activity-header">
                  <h3>Recent Activity</h3>
                  <ChevronRightIcon className="chevron-icon" />
                </div>
                <div className="activity-list">
                  {[1, 2, 3].map((item, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-info">
                        <h2>Added Log:</h2>
                        <h3 className="log-name">mylogexample</h3>
                      </div>
                      <div className="activity-time">
                        <h3>1d</h3>
                      </div>
                      <ClockIcon className="time-icon" />
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="logbooks-card">
          <div className="card-header">
            <h2>Log Books</h2>
            <button className="view-more-btn">View more</button>
          </div>
          <div className="logbooks-content">
            <img src={LogBooks} alt="Logbooks" className="logbooks-image" />
            <div className="progress-list">
              {[1, 2, 3].map((item, index) => (
                <div
                  key={item}
                  className="progress-item"
                  onClick={() => setSelectedLog(index)}
                >
                  <div className="progress-info">
                    <span>Adult Cardiac 2025</span>
                    <span>65%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
