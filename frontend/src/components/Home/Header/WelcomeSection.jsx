import "./WelcomeSection.css";

export default function WelcomeSection({ firstName }) {
  return (
    <div className="welcome-section">
      <h1>
        <span className="welcome-text">Welcome back, </span>
        <span className="user-name">{firstName}</span>
      </h1>
    </div>
  );
}
