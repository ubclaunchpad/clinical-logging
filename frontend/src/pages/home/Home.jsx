import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import MainContent from "../../components/Home/MainContent";
import "./Home.css";

export default function Home() {
  return (
    <NavContentWrapper>
      <div className="dashboard-container">
        <MainContent />
      </div>
    </NavContentWrapper>
  );
}


