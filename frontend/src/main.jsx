import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./utils/ProtectedRoutes.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import App from "./App.jsx";
import Login from "./pages/login/Login.jsx";
import NotFound from "./pages/not_found/NotFound.jsx";
import Home from "./pages/home/Home.jsx";
import Logbooks from "./pages/logbooks/Logbooks.jsx";
import LogHistory from "./pages/log_history/LogHistory.jsx";
import UploadPhoto from "./pages/upload_photo/UploadPhoto.jsx";
import ManualEntry from "./pages/manual_entry/ManualEntry.jsx";
import LogCode from "./pages/log_code/LogCode.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route index element={<App />} />
          <Route path="/logbooks" element={<Logbooks />} />
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<LogHistory />} />
          <Route path="/upload-photo" element={<UploadPhoto />} />
          <Route path="/manualEntry" element={<ManualEntry />} />
          <Route path="/logCode" element={<LogCode />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
