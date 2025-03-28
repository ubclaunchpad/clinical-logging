import { useState } from "react";
import "./Settings.css";
import SettingsTabs from "../../components/Settings/Profile/SettingsTab";
import { Navbar } from "../../components/Navbar/Navbar";
import LanguageSelector from "../../components/Settings/SystemPreferences/LanguageSelector";
import NotificationPreferences from "../../components/Settings/SystemPreferences/NotificationPreferences";
import ProfileForm from "../../components/Settings/Profile/ProfileForm";

const UpdateButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="update-button">
      Update System Preferences
    </button>
  );
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English (Canada)",
    code: "en-CA",
  });

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    console.log(`Language changed to: ${language.name}`);
  };

  const handleUpdateClick = () => {
    console.log("Updating system preferences");
  };

  return (
    <div className="main-content">
      <div className="homepage__left-column">
        <Navbar />
      </div>
      <div className="settings__main-column">
        <header className="settings_header">
          <div className="header-wrapper">
            <div className="header-inner">
              <div className="header-center">
                <div className="header-title">Settings</div>
              </div>
            </div>
          </div>
        </header>
        <div className="content">
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "profile" && <ProfileForm />}

          {activeTab === "system" && (
            <div>
              <section className="system-preferences__section language-row">
                <span className="language-row__title">Language and Region</span>
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  onChange={handleLanguageChange}
                />
              </section>

              <section className="notifications-row">
                <h2 className="notifications-row__title">Notifications</h2>
                <NotificationPreferences />
              </section>

              <div className="system-preferences__update">
                <UpdateButton onClick={handleUpdateClick} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
