import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

function TopBar({ candidate, handleUploadResume }) {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome, {candidate?.fullName.split(' ')[0]} 👋
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleUploadResume}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300"
        >
          Upload Resume
        </button>
        <FaBell size={24} className="text-gray-600 cursor-pointer hover:text-blue-600" />
        <FaUserCircle size={32} className="text-gray-600 cursor-pointer" />
      </div>
    </div>
  );
}

export default TopBar;
