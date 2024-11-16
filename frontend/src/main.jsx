import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./utils/ProtectedRoutes.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import App from "./App.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/sign_up/SignUp.jsx";
import NotFound from "./pages/not_found/NotFound.jsx";
import Home from "./pages/home/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewLog from "./pages/NewLog.jsx";
import LogHistory from "./pages/LogHistory.jsx";
import UploadPhotos from "./pages/UploadPhoto.jsx";
import ManualEntry from "./pages/manual_entry/ManualEntry.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route index element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-log" element={<NewLog />} />
          <Route path="/log-history" element={<LogHistory />} />
          <Route path="/upload-photos" element={<UploadPhotos />} />
          <Route path="/manual-entry" element={<ManualEntry />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
