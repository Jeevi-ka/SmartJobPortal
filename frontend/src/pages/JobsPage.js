import React, { useEffect, useState } from "react";
import axios from "axios";

function JobsPage({ candidateId, onApply, appliedJobs }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!candidateId) return;

    axios
      .get(`http://localhost:8080/api/jobs/candidate/${candidateId}`)
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [candidateId]);

  if (loading) return <p className="text-center p-10">Loading jobs...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Recommended Jobs For You</h1>

      {jobs.length === 0 ? (
        <p>No matching jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => {
            const isApplied = appliedJobs.includes(job.jobId);
            const canApply = job.canApply && !isApplied;

            let buttonText = "";
            if (isApplied) buttonText = "Already Applied";
            else if (!job.canApply) buttonText = "Not Eligible";
            else buttonText = "Apply Now";

            return (
              <div key={job.jobId} className="bg-white shadow-lg p-6 rounded-xl border">
                <h3 className="text-xl font-bold">{job.jobTitle}</h3>
                <p className="text-gray-600">{job.companyName}</p>
                <div className="mt-4">
                  <p><strong>Match:</strong> {job.matchPercentage}%</p>
                  <p className="text-green-600">Matched Skills: {job.matchedSkills.join(", ")}</p>
                  <p className="text-red-600">Missing Skills: {job.missingSkills.join(", ")}</p>
                </div>
                <div className="mt-4 text-sm">
                  <p><strong>Description:</strong> {job.jobDescription}</p>
                  <p><strong>Experience Required:</strong> {job.experienceRequired}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> {job.salaryPackage} LPA</p>

                  {job.companyWebsite && (
                    <p><strong>Company Website:</strong> 
                      <a href={job.companyWebsite} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                        {job.companyWebsite}
                      </a>
                    </p>
                  )}

                  <p className="mt-2 font-semibold">Academic Requirements</p>
                  <p>Minimum CGPA: {job.minimumCgpa}</p>
                  <p>10th Marks Required: {job.minimumTenthPercentage}%</p>
                  <p>12th Marks Required: {job.minimumTwelfthPercentage}%</p>
                  <p className="mt-2"><strong>Deadline:</strong> {job.applicationDeadline}</p>
                </div>

                <button
                  onClick={() => onApply(job.jobId)}
                  className={`mt-5 w-full py-2 rounded-lg text-white ${
                    canApply ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!canApply}
                >
                  {buttonText}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default JobsPage;
