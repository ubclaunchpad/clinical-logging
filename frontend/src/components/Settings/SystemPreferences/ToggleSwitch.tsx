import "./ToggleSwitch.css";

const ToggleSwitch = ({
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
