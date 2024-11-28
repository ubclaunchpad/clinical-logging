import React from "react";
import { useLocation } from "react-router-dom";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import "./ContentHeader.css";

export default function ContentHeader() {
  const location = useLocation();
  const isHistory = location.pathname === "/history";

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
