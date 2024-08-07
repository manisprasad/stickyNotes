import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './component/RegisterForm.jsx';
import Dashboard from './component/Dashboard.jsx';
import toast, { Toaster } from 'react-hot-toast';
import Login from './component/Login.jsx';
import Profile from './component/Profile.jsx';
import HomePage from './component/Home.jsx'; // Ensure the correct path

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Converts token to boolean
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        toast.success('Logged out successfully');
    };

    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <HomePage />} />
                <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard handleLogout={handleLogout} /> : <Navigate to="/" />} />
                <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
