import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
	const { session, logout } = useAuth();
	const navigate = useNavigate();

	async function handleClick(e) {
		try {
			await logout();
			navigate("/homepage");
		} catch (e) {
			console.log("Failed to logout");
		}
	}

	return (
		<>
			{session ? (
				<div>
					<p>Logout Page</p>
					<button onClick={handleClick}>Logout</button>
				</div>
			) : (
				<p>Not Signed In</p>
			)}
		</>
	);
}
