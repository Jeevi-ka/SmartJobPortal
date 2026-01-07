import React, { useState, useEffect } from "react";
import axios from "axios";
import RecruiterSidebar from "../components/RecruiterSidebar";
import RecruiterTopBar from "../components/RecruiterTopBar";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillAlt, FaCalendarAlt, FaUserCheck } from "react-icons/fa";
import ProfilePage from "./ProfilePage"; 


const RecruiterDashboardPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [jobsCount, setJobsCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [showJobs, setShowJobs] = useState(false); // Only show jobs when button clicked
  const [applications, setApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [applicationTab, setApplicationTab] = useState("PENDING");

  const [jobForm, setJobForm] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    requiredSkills: "",
    experienceRequired: "",
    location: "",
    companyWebsite: "",
    minimumCgpa: "",
    minimumTenthPercentage: "",
    minimumTwelfthPercentage: "",
    salaryPackage: "",
    applicationDeadline: "",
  });

  const recruiter = JSON.parse(localStorage.getItem("recruiter"));

  // 🔴 Redirect if recruiter not logged in
  useEffect(() => {
    if (!recruiter || !recruiter.id) {
      alert("Recruiter not logged in. Please login first.");
      window.location.href = "/recruiter-landing";
    }
  }, []);

  // 🔵 Load applications when Applications tab is opened
useEffect(() => {
  if (activeSection === "applications") {
    fetchApplications();
  }
}, [activeSection]);


  // ================= FETCH JOBS =================
  const fetchJobs = () => {
    if (!recruiter || !recruiter.id) return;

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/jobs/recruiter/${recruiter.id}`)
      .then((res) => {
        setJobs(res.data);
        setJobsCount(res.data.length);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  };

  // ================= JOB FORM HANDLERS =================
  const handleChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    if (!recruiter || !recruiter.id) {
      alert("Recruiter not logged in!");
      return;
    }

    try {
      // ✅ Send nested recruiter object as backend expects
      // Prepare payload safely
const payload = {
  ...jobForm,
  recruiter: { id: recruiter.id },
  minimumCgpa: jobForm.minimumCgpa ? Number(jobForm.minimumCgpa) : 0,
  minimumTenthPercentage: jobForm.minimumTenthPercentage ? Number(jobForm.minimumTenthPercentage) : 0,
  minimumTwelfthPercentage: jobForm.minimumTwelfthPercentage ? Number(jobForm.minimumTwelfthPercentage) : 0,
  applicationDeadline: jobForm.applicationDeadline || null,
};
console.log("Job payload:", payload);

// Send request
await axios.post("${process.env.REACT_APP_API_BASE_URL}/api/jobs/post", payload, {
  headers: { "Content-Type": "application/json" },
});


      alert("Job posted successfully!");

      // Reset form
      setJobForm({
        jobTitle: "",
        companyName: "",
        jobDescription: "",
        requiredSkills: "",
        experienceRequired: "",
        location: "",
        companyWebsite: "",
        minimumCgpa: "",
        minimumTenthPercentage: "",
        minimumTwelfthPercentage: "",
        salaryPackage: "",
        applicationDeadline: "",
      });

      // Fetch jobs again only if viewing jobs
      if (showJobs) fetchJobs();
    } catch (error) {
      console.error("Failed to post job:", error);
      alert("Failed to post job. Check console for details.");
    }
  };

  // ================= FETCH APPLICATIONS =================
const fetchApplications = async () => {
  if (!recruiter || !recruiter.id) return;

  setLoadingApplications(true);
  try {
    // 1️⃣ Get jobs of recruiter
    const jobsRes = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/jobs/recruiter/${recruiter.id}`
    );

    const recruiterJobs = jobsRes.data;
    let allApplications = [];

    // 2️⃣ For each job, get applications
    for (let job of recruiterJobs) {
      const appsRes = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/applications/job/${job.id}`
      );

      const appsWithJob = appsRes.data.map(app => ({
        ...app,
        jobTitle: job.jobTitle
      }));

      allApplications = [...allApplications, ...appsWithJob];
    }

    setApplications(allApplications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    alert("Failed to load applications");
  }
  setLoadingApplications(false);
};

// ================= APPROVE =================
const approveApplication = async (applicationId) => {
  await axios.put(
    `${process.env.REACT_APP_API_BASE_URL}/api/applications/approve/${applicationId}`
  );
  fetchApplications();
};

// ================= REJECT =================
const rejectApplication = async (applicationId) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/applications/reject/${applicationId}`
    );

    // 🔥 REMOVE rejected candidate from UI immediately
    setApplications(prev =>
      prev.filter(app => app.id !== applicationId)
    );

  } catch (error) {
    console.error("Reject failed", error);
  }
};


// ================= VIEW RESUME =================
const viewResume = (resumeId) => {
  window.open(
    `${process.env.REACT_APP_API_BASE_URL}/api/resumes/download/${resumeId}`,
    "_blank"
  );
};

const viewCandidateProfile = (candidateId) => {
  setSelectedCandidateId(candidateId);
  setActiveSection("candidateProfile");
};



  return (
    <div className="flex h-screen bg-gray-100">
      <RecruiterSidebar setActiveSection={setActiveSection} />

      <div className="flex-1 flex flex-col">
        <RecruiterTopBar recruiterName={recruiter?.companyName || ""} />

        <main className="p-6 overflow-y-auto">
          {/* ================= DASHBOARD ================= */}
          {activeSection === "dashboard" && (
            <>
              <h1 className="text-3xl font-bold mb-2">Recruiter Dashboard</h1>
              <p className="text-gray-600 mb-6">
                Hire smarter and faster with SmartJob Portal
              </p>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500 flex flex-col items-start">
                  <h2 className="text-gray-600 flex items-center gap-2">
                    <FaBriefcase /> Jobs Posted
                  </h2>
                  <p className="text-3xl font-bold text-blue-600">{jobsCount}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500 flex flex-col items-start">
                  <h2 className="text-gray-600 flex items-center gap-2">
                    <FaUserCheck /> Applications Received
                  </h2>
                  <p className="text-3xl font-bold text-green-600">0</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500 flex flex-col items-start">
                  <h2 className="text-gray-600 flex items-center gap-2">
                    <FaCalendarAlt /> Pending Approvals
                  </h2>
                  <p className="text-3xl font-bold text-yellow-600">0</p>
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">What you can do</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Post job openings</li>
                  <li>View applied candidates</li>
                  <li>Approve or reject applications</li>
                  <li>Track hiring easily</li>
                </ul>
              </div>
            </>
          )}

          {/* ================= JOBS SECTION ================= */}
          {activeSection === "jobs" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Post a Job</h1>

              {/* Job Form */}
              <form
                onSubmit={handlePostJob}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow mb-8"
              >
                {Object.keys(jobForm).map((field) => (
                  <input
                    key={field}
                    type={
                      field.includes("Deadline")
                        ? "date"
                        : ["minimumCgpa","minimumTenthPercentage","minimumTwelfthPercentage"].includes(field)
                        ? "number"
                        : "text"
                    }
                    name={field}
                    value={jobForm[field]}
                    onChange={handleChange}
                    placeholder={field}
                    required
                    className="border p-3 rounded"
                  />
                ))}

                <button
                  type="submit"
                  className="md:col-span-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
                >
                  Post Job
                </button>
              </form>

              {/* Show jobs button */}
              <button
                onClick={() => {
                  fetchJobs();
                  setShowJobs(true);
                }}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mb-4"
              >
                View My Posted Jobs
              </button>

              {/* Posted Jobs */}
              {showJobs && (
                <div className="space-y-4">
                  {jobs.length === 0 ? (
                    <p className="text-gray-600">No jobs posted yet.</p>
                  ) : (
                    jobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-white p-4 rounded-xl shadow flex flex-col gap-2 hover:shadow-lg transition"
                      >
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          <FaBriefcase /> {job.jobTitle}
                        </h3>
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaMapMarkerAlt /> {job.location}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <FaMoneyBillAlt /> Salary: {job.salaryPackage} LPA
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <FaCalendarAlt /> Deadline: {job.applicationDeadline}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}

          {/* ================= APPLICATIONS ================= */}
{activeSection === "applications" && (
  <div className="bg-white p-6 rounded-xl shadow">
    <h1 className="text-2xl font-bold mb-4">Applications Received</h1>
    <div className="flex gap-4 mb-6">
  <button
    onClick={() => setApplicationTab("PENDING")}
    className={`px-4 py-2 rounded ${
      applicationTab === "PENDING"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Pending Applications
  </button>

  <button
    onClick={() => setApplicationTab("APPROVED")}
    className={`px-4 py-2 rounded ${
      applicationTab === "APPROVED"
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    Approved Candidates
  </button>
</div>


    {loadingApplications ? (
      <p>Loading applications...</p>
    ) : applications.length === 0 ? (
      <p className="text-gray-600">No applications found.</p>
    ) : (
      <div className="space-y-4">
        {applications
  .filter(app => app.status === applicationTab)
  .map((app) => (


          <div
            key={app.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg mb-1">
              Job: {app.jobTitle}
            </h3>

            <p><b>Candidate:</b> {app.candidate.name}</p>
            <p><b>Email:</b> {app.candidate.email}</p>
            <p><b>Phone:</b> {app.candidate.phoneNumber}</p>
            <p><b>Status:</b> {app.status}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => viewResume(app.resume.id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                View Resume
              </button>

              {/* ✅ View Profile Button */}
              <button
                onClick={() => {
                  setSelectedCandidate(app.candidate); // store candidate
                  setActiveSection("profile");         // switch section
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Profile
              </button>

              {applicationTab === "PENDING" && (
  <>
    <button
      onClick={() => approveApplication(app.id)}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Approve
    </button>

    <button
      onClick={() => rejectApplication(app.id)}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Reject
    </button>
  </>
)}

            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}
{activeSection === "profile" && selectedCandidate && (
  <div>
    <button
      onClick={() => setActiveSection("applications")}
      className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
    >
      ← Back
    </button>

    <ProfilePage
      candidate={selectedCandidate}
      readOnly={true}   // 👈 IMPORTANT
    />
  </div>
)}



        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboardPage;
