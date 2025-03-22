import "./SettingsTab.css";

function SettingsTabs({ activeTab, onTabChange }) {
  return (
    <div className="settings-tabs">
      <div
        className={`settings-tab settings-tab--profile ${
          activeTab === "profile" ? "active" : ""
        }`}
        onClick={() => onTabChange("profile")}
      >
        <div className="settings-tab__label">Your Profile</div>
        {activeTab === "profile" && <div className="settings-tab__indicator" />}
      </div>

      <div
        className={`settings-tab settings-tab--system ${
          activeTab === "system" ? "active" : ""
        }`}
        onClick={() => onTabChange("system")}
      >
        <div className="settings-tab__label">System Preferences</div>
        {activeTab === "system" && <div className="settings-tab__indicator" />}
      </div>
    </div>
  );
}

export default SettingsTabs;
