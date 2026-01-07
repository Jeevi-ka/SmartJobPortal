import React, { useEffect, useState } from "react";
import axios from "axios";

function AppliedJobsPage() {
  const candidate = JSON.parse(localStorage.getItem("candidate"));
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!candidate?.id) return;

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/applications/candidate/${candidate.id}`)
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch applied jobs", err);
        setLoading(false);
      });
  }, [candidate?.id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading applied jobs...</p>;
  }

  if (applications.length === 0) {
    return (
      <p className="text-center text-gray-500">
        You haven’t applied to any jobs yet.
      </p>
    );
  }

  return (
  <div className="space-y-6">
    {applications.map((app) => {
      const job = app.job;

      return (
        <div
          key={app.id}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {job.jobTitle}
              </h2>

              <p className="text-gray-600">
                {job.recruiter?.companyName || "Company not specified"}
              </p>

              <p className="text-gray-500">{job.location}</p>
            </div>

            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
              {app.status}
            </span>
          </div>

          {/* META */}
          <p className="mt-2 text-sm text-gray-600">
            Applied On:{" "}
            {app.expectedJoiningDate
              ? new Date(app.expectedJoiningDate).toLocaleDateString()
              : "N/A"}
          </p>

          {/* VIEW MORE */}
          <details className="mt-4">
            <summary className="cursor-pointer text-blue-600 font-medium">
              View Full Details
            </summary>

            <div className="mt-3 space-y-2 text-gray-700">
              <p>
                <strong>Description:</strong>{" "}
                {job.jobDescription}
              </p>

              <p>
                <strong>Required Skills:</strong>{" "}
                {job.requiredSkills}
              </p>

              <p>
                <strong>Experience Required:</strong>{" "}
                {job.experienceRequired}
              </p>

              <p>
                <strong>Salary Package:</strong>{" "}
                {job.salaryPackage} LPA
              </p>

              <p>
                <strong>Expected CTC:</strong>{" "}
                {app.expectedCtc}
              </p>

              <p>
                <strong>Application Deadline:</strong>{" "}
                {job.applicationDeadline}
              </p>
            </div>
          </details>
        </div>
      );
    })}
  </div>
);

}

export default AppliedJobsPage;
