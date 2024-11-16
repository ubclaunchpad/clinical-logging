import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './utils/ProtectedRoutes.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import App from './App.jsx'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/sign_up/SignUp.jsx'
import NotFound from './pages/not_found/NotFound.jsx'
import Home from './pages/home/Home.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route index element={<App />} />
          <Route path='/dashboard' element={<App />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
