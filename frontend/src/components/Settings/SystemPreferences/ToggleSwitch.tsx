import React from "react";
import "./ToggleSwitch.css";

interface ToggleSwitchProps {
  isActive?: boolean;
  onChange?: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isActive = true,
  onChange,
}) => {
  return (
    <button
      onClick={onChange}
      className={`toggle-switch ${isActive ? "active" : "inactive"}`}
      role="switch"
      aria-checked={isActive}
    >
      <div className="toggle-switch__thumb" />
    </button>
  );
};

export default ToggleSwitch;
