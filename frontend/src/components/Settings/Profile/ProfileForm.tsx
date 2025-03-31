import { useState } from "react";
import "./ProfileForm.css";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeSlashIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { CLButtonSecondary } from "../../Buttons/CLButtons";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@med.ubc.ca",
    password: "********************",
    institution: "UBC Faculty of Medicine",
    stageOfTraining: "Medical student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isStageOpen, setIsStageOpen] = useState(false);

  const stageOptions = ["Medical student", "Resident", "Fellow", "Attending"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleStageSelect = (option) => {
    setFormData((prev) => ({ ...prev, stageOfTraining: option }));
    setIsStageOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form__row">
        <div className="profile-form__field">
          <label htmlFor="firstName" className="profile-form__label">
            First name
          </label>
          <div className="profile-form__input-container">
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="profile-form__input"
              type="text"
            />
          </div>
        </div>
        <div className="profile-form__field">
          <label htmlFor="lastName" className="profile-form__label">
            Last name
          </label>
          <div className="profile-form__input-container">
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="profile-form__input"
              type="text"
            />
          </div>
        </div>
      </div>

      <div className="profile-form__row">
        <div className="profile-form__field">
          <label htmlFor="email" className="profile-form__label">
            Email
          </label>
          <div className="profile-form__input-container">
            <EnvelopeIcon className="profile-form__icon-left" />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className="profile-form__input"
            />
          </div>
        </div>
        <div className="profile-form__field">
          <label htmlFor="password" className="profile-form__label">
            Password
          </label>
          <div className="profile-form__input-container">
            <LockClosedIcon className="profile-form__icon-left" />
            <input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="profile-form__input"
              type={showPassword ? "text" : "password"}
            />
            <EyeSlashIcon
              className="profile-form__icon-right"
              onClick={handleTogglePassword}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      <div className="profile-form__row">
        <div className="profile-form__field">
          <label htmlFor="institution" className="profile-form__label">
            Institution
          </label>
          <div className="profile-form__input-container">
            <input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="profile-form__input"
              type="text"
            />
          </div>
        </div>
        <div className="profile-form__field">
          <label htmlFor="stageOfTraining" className="profile-form__label">
            Stage of Training
          </label>
          <div className="profile-form__input-container">
            <button
              type="button"
              className="profile-form__select-button"
              onClick={() => setIsStageOpen(!isStageOpen)}
            >
              <span>{formData.stageOfTraining}</span>
              <ChevronDownIcon className="profile-form__icon-right profile-form__arrow-icon" />
            </button>
            {isStageOpen && (
              <ul
                className="profile-form__select-dropdown"
                role="listbox"
              >
                {stageOptions.map((option) => (
                  <li
                    key={option}
                    role="option"
                    onClick={() => handleStageSelect(option)}
                    className="profile-form__select-option"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <CLButtonSecondary type="submit" className="profile-form__submit">
        Update profile
      </CLButtonSecondary>
    </form>
  );
};

export default ProfileForm;
