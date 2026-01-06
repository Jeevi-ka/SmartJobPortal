import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import JobsPage from './JobsPage';
import AppliedJobsPage from './AppliedJobsPage';
import ProfilePage from "./ProfilePage";


function DashboardPage() {
  const navigate = useNavigate();
  const candidate = JSON.parse(localStorage.getItem('candidate'));

  const [activeSection, setActiveSection] = useState('dashboard');
  const [applyJobId, setApplyJobId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [resumeMissingJobs, setResumeMissingJobs] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    department: '',
    rollNumber: '',
    collegeName: '',
    degree: '',
    specialization: '',
    cgpa: '',
    tenthMarks: '',
    twelfthMarks: '',
    phoneNumber: '',
    email: '',
    currentAddress: '',
    linkedInUrl: '',
    githubUrl: '',
    hackerrankUrl: '',
    portfolioUrl: '',
    willingToRelocate: '',
    preferredLocation: '',
    expectedJoiningDate: '',
    noticePeriod: '',
    expectedCtc: '',
    coverLetter: '',
    referenceName: ''
  });


  useEffect(() => {
    const candidateId = candidate?.id;
    if (!candidateId) return;

    axios
      .get(`http://localhost:8080/api/applications/candidate/${candidateId}`)
      .then(res => {
        const appliedJobIds = res.data.map(application => application.job.id);
        setAppliedJobs(appliedJobIds);
      })
      .catch(err => {
        console.error("Failed to fetch applied jobs", err);
      });
  }, [candidate?.id]);

  const handleLogout = () => {
    localStorage.removeItem('candidate');
    navigate('/');
  };

  const handleUploadResume = () => {
    setActiveSection('resume');
  };

  const handleResumeUpload = () => {
    if (!resumeFile) return;

    const candidateId = candidate?.id;
    const data = new FormData();
    data.append("file", resumeFile);

    axios
      .post(`http://localhost:8080/api/resumes/upload/pdf/${candidateId}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(() => {
        alert("Resume uploaded successfully!");
        setActiveSection("jobs");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to upload resume.");
      });
  };

  const handleJobsClick = () => {
    const candidateId = candidate?.id;
    if (!candidateId) return;

    axios
      .get(`http://localhost:8080/api/resumes/check/${candidateId}`)
      .then(res => {
        if (res.data === false) {
          setResumeMissingJobs(true);
          setActiveSection('jobs');
        } else {
          setResumeMissingJobs(false);
          setActiveSection('jobs');
        }
      })
      .catch(() => {
        setResumeMissingJobs(true);
        setActiveSection('jobs');
      });
  };

  const handleApplicationsClick = () => {
    setActiveSection('applications');
  };

  const handleApply = jobId => {
    setApplyJobId(jobId);
    setShowApplyForm(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:8080/api/applications/submit/${candidate?.id}/${applyJobId}`,
        formData
      )
      .then(() => {
        alert("Application submitted successfully!");
        setShowApplyForm(false);
        setAppliedJobs(prev => [...prev, applyJobId]);
        setFormData({
          fullName: '',
          age: '',
          gender: '',
          department: '',
          rollNumber: '',
          collegeName: '',
          degree: '',
          specialization: '',
          cgpa: '',
          tenthMarks: '',
          twelfthMarks: '',
          phoneNumber: '',
          email: '',
          currentAddress: '',
          linkedInUrl: '',
          githubUrl: '',
          hackerrankUrl: '',
          portfolioUrl: '',
          willingToRelocate: '',
          preferredLocation: '',
          expectedJoiningDate: '',
          noticePeriod: '',
          expectedCtc: '',
          coverLetter: '',
          referenceName: ''
        });
      })
      .catch(err => {
        console.error(err);
        alert("Failed to submit application.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogout={handleLogout}
        handleJobsClick={handleJobsClick}
        handleApplicationsClick={handleApplicationsClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopBar candidate={candidate} handleUploadResume={handleUploadResume} />

        <main className="flex-1 overflow-auto p-6">
          {activeSection === 'dashboard' && (
            <div className="space-y-10">
              {/* Hero Section */}
              <section className="bg-white p-10 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Welcome to Smart Job Portal
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg">
                    Smart Job Portal helps you find your dream job faster. Browse top companies, apply with a single click, track your applications, and manage your professional profile—all in one place.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300">
                    Explore Jobs
                  </button>
                </div>

                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                  <img
                    src="/assets/hero.png"
                    alt="Job portal illustration"
                    className="max-w-sm rounded-xl shadow-lg"
                  />
                </div>
              </section>
            </div>
          )}

          {activeSection === 'jobs' && !resumeMissingJobs && (
            <JobsPage
              candidateId={candidate?.id}
              onApply={handleApply}
              appliedJobs={appliedJobs}
            />
          )}

          {activeSection === 'jobs' && resumeMissingJobs && (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="bg-white shadow-xl p-7 rounded-xl text-center w-96">
                <h2 className="text-xl font-bold text-red-600 mb-4">Resume Required</h2>
                <p className="text-gray-700 mb-4">Please upload your resume to see jobs that match your profile.</p>
                <button
                  onClick={() => setActiveSection('resume')}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  Upload Resume
                </button>
              </div>
            </div>
          )}

          {activeSection === 'resume' && (
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md">
              <h2 className="text-xl font-bold mb-4">Resume Upload</h2>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="mb-4"
              />
              <button
                onClick={handleResumeUpload}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                disabled={!resumeFile}
              >
                Upload Resume
              </button>
            </div>
          )}

          {/* CENTERED APPLY FORM */}
          {showApplyForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
              <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                  onClick={() => setShowApplyForm(false)}
                >
                  ×
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center">Apply for this Job</h2>

                <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="border p-2 rounded" />
                  <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" required className="border p-2 rounded" />
                  <select name="gender" value={formData.gender} onChange={handleChange} required className="border p-2 rounded">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                  <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" required className="border p-2 rounded" />
                  <input name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="Roll Number" required className="border p-2 rounded" />
                  <input name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="College Name" required className="border p-2 rounded" />
                  <input name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" required className="border p-2 rounded" />
                  <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" required className="border p-2 rounded" />
                  <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="CGPA" type="number" step="0.01" required className="border p-2 rounded" />
                  <input name="tenthMarks" value={formData.tenthMarks} onChange={handleChange} placeholder="10th Marks (%)" type="number" step="0.01" required className="border p-2 rounded" />
                  <input name="twelfthMarks" value={formData.twelfthMarks} onChange={handleChange} placeholder="12th Marks (%)" type="number" step="0.01" required className="border p-2 rounded" />
                  <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required className="border p-2 rounded" />
                  <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required className="border p-2 rounded" />
                  <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} placeholder="Current Address" required className="border p-2 rounded" />
                  <input name="linkedInUrl" value={formData.linkedInUrl} onChange={handleChange} placeholder="LinkedIn URL (or NILL)" className="border p-2 rounded" />
                  <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="GitHub URL (or NILL)" className="border p-2 rounded" />
                  <input name="hackerrankUrl" value={formData.hackerrankUrl} onChange={handleChange} placeholder="HackerRank URL (or NILL)" className="border p-2 rounded" />
                  <input name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} placeholder="Portfolio URL (or NILL)" className="border p-2 rounded" />
                  <select name="willingToRelocate" value={formData.willingToRelocate} onChange={handleChange} required className="border p-2 rounded">
                    <option value="">Willing to Relocate?</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  <input name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} placeholder="Preferred Location" className="border p-2 rounded" />
                  <input name="expectedJoiningDate" value={formData.expectedJoiningDate} onChange={handleChange} type="date" required className="border p-2 rounded" />
                  <input name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} placeholder="Notice Period" required className="border p-2 rounded" />
                  <input name="expectedCtc" value={formData.expectedCtc} onChange={handleChange} placeholder="Expected CTC" required className="border p-2 rounded" />
                  <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} placeholder="Cover Letter" className="border p-2 rounded h-24" />
                  <input name="referenceName" value={formData.referenceName} onChange={handleChange} placeholder="Reference Name" className="border p-2 rounded" />

                  <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2">
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeSection === 'profile' && (
          <ProfilePage candidate={candidate} />
          )}

          {activeSection === 'applications' && <AppliedJobsPage />}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
