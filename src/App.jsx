import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages with correct paths
import Login from './pages/Login';
import Register from './pages/Register';
import GuestDashboard from './pages/GuestDashboard';
import HotelManagerDashboard from './pages/HotelManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes */}
            <Route
              path="/guest/*"
              element={
                <ProtectedRoute allowedRoles={['Guest']}>
                  <GuestDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/manager/*"
              element={
                <ProtectedRoute allowedRoles={['HotelManager']}>
                  <HotelManagerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirect to login page as default */}
            <Route
              path="/"
              element={<Login />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App; 