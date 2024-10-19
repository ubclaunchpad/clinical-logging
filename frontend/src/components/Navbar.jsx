import { useNavigate } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <NavbarComponent />
    </div>
  );
}

function NavbarComponent() {
    return (
      <>
          <div className="navbar">
        <Logo />
        <NavButtons />
      </div>
      <div className="divider-line"></div> {/* Divider line */}
      </>
    );
}

function Logo() {
    return (
      <div className="logo-text-container">
        <span className="logo-text-bold">
          FlowLeaflets <br />
            <span className="logo-text-small">Clinical Logbooks</span>
          </span>
      </div>
    );
}

function NavButtons() {
    const navigate = useNavigate(); 
  
    const handleHomeClick = () => {
      navigate("/dashboard"); 
    };

    const handleNewLog = () => {
      navigate("/newLog");
    };

    const handleLogHistory = () => {
      navigate("/logHistory");
    };
  
    return (
      <div className = "nav-buttons-container">
        <button onClick={handleHomeClick}>
            Home
        </button>
        <button onClick={handleNewLog}>
            New Log
        </button>
        <button onClick={handleLogHistory}>
            Log History
        </button>
      </div>
    );
}