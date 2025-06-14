import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from './pages/Home';
import EntryForm from './pages/EntryForm';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Settings from './pages/Settings';

// import.meta.env.VITE_API_URL



function App() {
  const { token } = useAuth();
  return (
    <>
    <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<EntryForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={
          <Dashboard />
      } />
      <Route path="/admin" element={
        <ProtectedRoute><AdminPanel /></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
      } />
      </Routes>
    </>
  )
}

export default App
