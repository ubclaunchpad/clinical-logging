import Logo from "../Logo/Logo";
import HomeButton from "../Buttons/HomeButton";
import CreateNewLogButton from "../Buttons/CreateNewLogButton";
import LogHistoryButton from "../Buttons/LogHistoryButton";
import SignInButton from "../Buttons/SignInButton";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";
import SignOutButton from "../Buttons/SignOutButton";

export default function Navbar({ variant }) {
  return (
    <div>
      <NavbarComponent variant={variant} />
    </div>
  );
}

function NavbarComponent({ variant }) {
  return (
    <div className="navbar">
      <Logo />
      <NavButtons variant={variant} />
    </div>
  );
}

function NavButtons({ variant }) {
  return (
    <div className="nav-buttons-container">
      {variant === "homepage" ? (
        <Buttons />
      ) : (
        <>
          <HomeButton />
          <CreateNewLogButton variant="navbar" />
          <LogHistoryButton variant="navbar" />
        </>
      )}
    </div>
  );
}

function Buttons() {
  const { session } = useAuth();

  return (
    <div className="nav-buttons-container">
      {session ? <SignOutButton /> : <SignInButton />}
    </div>
  );
}
