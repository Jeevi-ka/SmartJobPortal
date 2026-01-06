import React from 'react';
import { FaUserCircle, FaBriefcase, FaFileAlt, FaUpload, FaSignOutAlt, FaUser } from 'react-icons/fa';



function Sidebar({ activeSection, setActiveSection, handleLogout, handleJobsClick, handleApplicationsClick }) {
    return (
        <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-700 text-white flex flex-col sticky top-0 h-screen shadow-lg">
            <div className="p-6 flex flex-col items-center">
                <FaUserCircle size={60} className="mb-2" />
            </div>
            <nav className="flex-1 mt-6">
                <ul>
                    <li
                        className={`flex items-center p-4 cursor-pointer hover:bg-blue-500 ${activeSection === 'dashboard' ? 'bg-blue-500' : ''
                            }`}
                        onClick={() => setActiveSection('dashboard')}
                    >
                        <FaBriefcase className="mr-3" /> Dashboard
                    </li>
                    <li
                        className={`flex items-center p-4 cursor-pointer hover:bg-blue-500 ${
                            activeSection === 'profile' ? 'bg-blue-500' : ''
                        }`}
                        onClick={() => setActiveSection('profile')}
                        >
                        <FaUser className="mr-3" /> Profile
                    </li>

                    <li
                        className={`flex items-center p-4 cursor-pointer hover:bg-blue-500 ${activeSection === 'jobs' ? 'bg-blue-500' : ''
                            }`}
                        onClick={handleJobsClick}
                    >
                        <FaBriefcase className="mr-3" /> Jobs
                    </li>

                    <li
                        className={`flex items-center p-4 cursor-pointer hover:bg-blue-500 ${activeSection === 'applications' ? 'bg-blue-500' : ''
                            }`}
                        onClick={handleApplicationsClick} // ✅ updated
                    >
                        <FaFileAlt className="mr-3" /> Applications
                    </li>

                    <li
                        className={`flex items-center p-4 cursor-pointer hover:bg-blue-500 ${activeSection === 'resume' ? 'bg-blue-500' : ''
                            }`}
                        onClick={() => setActiveSection('resume')}
                    >
                        <FaUpload className="mr-3" /> Resume Upload
                    </li>
                    <li
                        onClick={handleLogout}
                        className="flex items-center p-4 cursor-pointer hover:bg-red-500 mt-6 text-red-200 hover:text-white rounded-lg mx-3 justify-center"
                    >
                        <FaSignOutAlt className="mr-2" /> Logout
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
