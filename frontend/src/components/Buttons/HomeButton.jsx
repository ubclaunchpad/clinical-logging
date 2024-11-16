import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  return <button onClick={handleHomeClick}>Home</button>;
}
