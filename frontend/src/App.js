import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import JobsPage from "./pages/JobsPage";
import AppliedJobsPage from './pages/AppliedJobsPage';
import ProfilePage from "./pages/ProfilePage";
import RecruiterLandingPage from "./pages/RecruiterLandingPage";
import RecruiterDashboardPage from "./pages/RecruiterDashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recruiter-landing" element={<RecruiterLandingPage />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboardPage />} />

        
      </Routes>


    </Router>
  );
}

export default App;
