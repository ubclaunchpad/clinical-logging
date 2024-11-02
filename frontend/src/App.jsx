import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("Test Message")
  const { logout, session } = useAuth()
  const [authorized, setAuthorized] = useState("Test Authorization"); 
  const navigate = useNavigate();


  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api")
    setMessage(response.data.message)
    console.log(response)
  }

  const checkPost = async () => {
    const token = session.access_token;
    const data = {
      content: "This is from the client"
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/check", data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log(response);
      setAuthorized(response.data.message);
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleClickLogout = async () => {
    try {
			await logout();
			navigate("/homepage");
		} catch (e) {
			console.log("Failed to logout");
		}
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>{message}</p>
      <button onClick={fetchAPI}>Fetch API</button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {session ? (
        <div>
          <h1>Logged In</h1>
          <button onClick={checkPost}>Check Authorization</button>
          <p>{authorized}</p>
          <button onClick={handleClickLogout}>Log out</button>
        </div>
        ) : <h1>Logged Out</h1>}

      

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
