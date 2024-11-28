import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./utils/ProtectedRoutes.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import App from "./App.jsx";
import Login from "./pages/login/Login.jsx";
import NotFound from "./pages/not_found/NotFound.jsx";
import Home from "./pages/Homepage.jsx";
import Homepage from "./pages/Homepage.jsx";
import Logbooks from "./pages/Logbooks.jsx";
import LogHistory from "./pages/LogHistory.jsx";
import UploadPhotos from "./pages/UploadPhoto.jsx";
import ManualEdit from "./pages/ManualEdit.jsx";
import "./index.css";
import LogCode from "./pages/LogCode.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route index element={<App />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/logbooks" element={<Logbooks />} />
          <Route path="/history" element={<LogHistory />} />
          <Route path="/uploadPhotos" element={<UploadPhotos />} />
          <Route path="/manualEdit" element={<ManualEdit />} />
          <Route path="/logcode" element={<LogCode />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
