import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import "./ContentHeader.css";
import { useState, useRef, useEffect } from "react";

export default function ContentHeader({ header, primaryButtonText, actions, addAction }) {
  return (
    <div className="content-header">
      <h2>{header}</h2>
      <div className="button-group">
        <AddButton text={primaryButtonText} onClick={addAction} />
        <ActionsButton actions={actions} />
      </div>
    </div>
  );
}

function AddButton({ text, onClick = () => {} }) {
  return (
    <button onClick={onClick} className="add-button">
      {text}
      <PlusIcon className="plus-icon" />
    </button>
  );
}

function ActionsButton({ actions }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="actions-wrapper" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`actions-button ${isOpen ? "actions-button-active" : ""}`}
      >
        <span>Actions</span>
        <ChevronDownIcon
          className={`down-icon ${isOpen ? "down-icon-active" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="actions-dropdown">
          {actions.map((action, index) => (
            <button
              key={index}
              className="action-item"
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
            >
              {action.icon && <action.icon />}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
