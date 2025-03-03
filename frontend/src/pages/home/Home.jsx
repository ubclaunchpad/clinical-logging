import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { BellIcon } from "@heroicons/react/24/outline";
import MainContent from "../../components/Home/MainContent";
import { useAuth } from "../../contexts/AuthContext";
import "./Home.css";

export const Home = () => {
  const { session } = useAuth();
  const userName = session?.user?.user_metadata?.first_name || "User";
  return (
    <div className="homepage">
      <div className="homepage__layout">
        <div className="homepage__left-column">
          <Navbar />
        </div>
        <div className="homepage__main-column">
          <div className="homepage__content">
            <Header userName={userName} />
            <div className="homepage__cards-container">
              <div className="homepage__cards-inner">
                <MainContent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Header({ userName }) {
  return (
    <div className="header">
      <h1>
        <span className="header__welcome-text">Welcome back, </span>
        <span className="header__user-name">{userName}!</span>
      </h1>
      <div className="header__notification">
        <BellIcon className="header__notification-icon" />
      </div>
    </div>
  );
}

export default Home;
