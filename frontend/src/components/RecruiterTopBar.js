import React from "react";

const RecruiterTopBar = () => {
  const recruiter = JSON.parse(localStorage.getItem("recruiter"));

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700">
        Welcome, {recruiter?.companyName || "Recruiter"}
      </h1>
    </div>
  );
};

export default RecruiterTopBar;
