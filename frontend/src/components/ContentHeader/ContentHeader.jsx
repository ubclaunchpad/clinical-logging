import { useLocation, useNavigate } from "react-router-dom";
import {
  PlusIcon,
  ChevronDownIcon,
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import "./ContentHeader.css";

export default function ContentHeader({ onPreviewClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHistory = location.pathname === "/history";
  const isUploadPhoto = location.pathname === "/upload-photo";

  if (isUploadPhoto) {
    return (
      <div className="upload-photo-header">
        <button className="back-button" onClick={() => navigate("/home")}>
          <ChevronLeftIcon className="upload-back-icon" />
        </button>
        <div className="title-wrapper">
          <h2 className="upload-photo-title">Upload Photos</h2>
        </div>
        <button className="preview-button" onClick={onPreviewClick}>
          Preview
          <ChevronDoubleLeftIcon className="preview-icon" />
        </button>
      </div>
    );
  }

  return (
    <div className="content-header">
      <h2>{isHistory ? "Log History" : "Logbooks"}</h2>
      <div className="button-group">
        <AddButton
          variant={isHistory ? "history" : "logbook"}
          onClick={() => {}}
        />
        <ActionsButton onClick={() => {}} />
      </div>
    </div>
  );
}

function AddButton({ variant = "logbook", onClick = () => {} }) {
  return (
    <button onClick={onClick} className="add-button">
      {variant === "history" ? "Add Logs" : "Add Book"}
      <PlusIcon className="plus-icon" />
    </button>
  );
}

function ActionsButton({ onClick = () => {} }) {
  return (
    <button onClick={onClick} className="actions-button">
      <span>Actions</span>
      <ChevronDownIcon className="down-icon" />
    </button>
  );
}
