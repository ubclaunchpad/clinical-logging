import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import { useAuth } from "../../contexts/AuthContext";
import MainContent from "../../components/Home/MainContent";
import "./Home.css";

export default function Home() {
  const { session } = useAuth();

  return (
    <NavContentWrapper>
      <div className="dashboard-container">
        <WelcomeSection
          firstName={session?.user?.user_metadata?.first_name || "User"}
        />
        <MainContent />
      </div>
    </NavContentWrapper>
  );
}

function WelcomeSection({ firstName }) {
  return (
    <div className="welcome-section">
      <h1>
        <span className="welcome-text">Welcome back, </span>
        <span className="user-name">{firstName}</span>
      </h1>
    </div>
  );
}
