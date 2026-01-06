import React from "react";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUserCheck,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecruiterSidebar = ({ setActiveSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("recruiter");
    navigate("/recruiter-landing");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-700 text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">SmartJob Portal</h2>

      <nav className="flex flex-col gap-4">
        {/* Dashboard */}
        <button
          onClick={() => setActiveSection("dashboard")}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          <FaTachometerAlt /> Dashboard
        </button>

        {/* Jobs */}
        <button
          onClick={() => setActiveSection("jobs")}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          <FaBriefcase /> Jobs
        </button>

        {/* Applications */}
        <button
          onClick={() => setActiveSection("applications")}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          <FaUserCheck /> Applications
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-500 transition mt-auto"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default RecruiterSidebar;
