import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import "./CreateNewLogButton.css";

export default function CreateNewLogButton({ variant }) {
  const navigate = useNavigate();

  const handleCreateNewLog = () => {
    navigate("/new-log");
  };

  return (
    <button
      onClick={handleCreateNewLog}
      className={`create-new-log-button ${
        variant === "navbar" ? "navbar-style" : ""
      }`}
    >
      {variant !== "navbar" && <AddIcon className="add-icon" />}
      Create New Log
    </button>
  );
}
