import { useNavigate } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import "./LogHistoryButton.css";

export default function LogHistoryButton({ variant }) {
  const navigate = useNavigate();

  const handleViewHistory = () => {
    navigate("/logHistory");
  };

  return (
    <button
      onClick={handleViewHistory}
      className={`log-history-button ${
        variant === "navbar" ? "navbar-style" : ""
      }`}
    >
      {variant !== "navbar" && <HistoryIcon className="history-icon" />}
      View Log History
    </button>
  );
}
