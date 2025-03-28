import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import "./NotificationPreferences.css";

const defaultSettings = [
  {
    id: "new-logbook",
    label: "Receive confirmation when you've added a new logbook",
    enabled: true,
  },
  {
    id: "delete-logbook",
    label: "Receive confirmation when you've deleted a logbook",
    enabled: true,
  },
  {
    id: "storage-low",
    label: "Get notified when logbook storage is running low",
    enabled: true,
  },
  {
    id: "new-releases",
    label: "Stay updated on new logbook releases",
    enabled: true,
  },
];

const NotificationPreferences = ({
  initialSettings = defaultSettings,
  onChange,
}) => {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = (id) => {
    const updatedSettings = settings.map((setting) =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    );
    setSettings(updatedSettings);
    onChange?.(updatedSettings);
  };

  return (
    <div className="notification-preferences">
      <div className="notification-preferences__content">
        {settings.map((setting) => (
          <div key={setting.id} className="notification-preferences__item">
            <div className="notification-preferences__label">{setting.label}</div>
            <ToggleSwitch
              isActive={setting.enabled}
              onChange={() => handleToggle(setting.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreferences;
