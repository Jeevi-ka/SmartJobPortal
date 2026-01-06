import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaGraduationCap,
  FaTools,
  FaProjectDiagram,
  FaLink
} from "react-icons/fa";

function ProfilePage({ candidate, readOnly = false }) {
  const candidateId = candidate?.id;
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);

useEffect(() => {
  if (!candidateId) return;

  // Only fetch if profile is empty (first load)
  if (Object.keys(profile).length === 0) {
    axios
      .get(`http://localhost:8080/api/profile/candidate/${candidateId}`)
      .then(res => setProfile(res.data || {}))
      .catch(err => console.error(err));
  }
}, [candidateId]); // ✅ keep only candidateId
 useEffect(() => {
  if (!editMode) {
    setProfile(candidate || {}); // Load candidate prop only if not editing
  }
}, [candidate, editMode]);



  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/profile", {
        ...profile,
        candidateId
      });
      setProfile(res.data);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile");
    }
  };

  const Section = ({ title, icon, children }) => (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </div>
  );

  const Field = ({ name, placeholder, type = "text" }) => (
    <input
      name={name}
      value={profile[name] || ""}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={readOnly || !editMode} // 👈 IMPORTANT
      type={type}
      className="border p-3 rounded-lg w-full"
    />
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">
          {readOnly ? profile.name || "Candidate Profile" : "My Profile"}
        </h2>
        {!readOnly && (
          !editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Save Changes
            </button>
          )
        )}
      </div>

      {/* BASIC INFO */}
      <Section title="Basic Information" icon={<FaUser />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Field name="name" placeholder="Full Name" />
          <Field name="phone" placeholder="Phone Number" />
          <Field name="email" placeholder="Email Address" />
          <Field name="summary" placeholder="Professional Summary" />
        </div>
      </Section>

      {/* SKILLS */}
      <Section title="Skills & Experience" icon={<FaTools />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Field name="skills" placeholder="Skills (comma separated)" />
          <Field name="experience" placeholder="Experience (years)" />
        </div>
      </Section>

      {/* PROJECTS */}
      <Section title="Projects" icon={<FaProjectDiagram />}>
        <Field name="projectTitle" placeholder="Project Title" />
        <textarea
          name="projectDescription"
          value={profile.projectDescription || ""}
          onChange={handleChange}
          disabled={readOnly || !editMode} // ✅ FIX
          placeholder="Project Description"
          className="border p-3 rounded-lg w-full"
        />
        <Field name="techStack" placeholder="Tech Stack Used" />
      </Section>

      {/* EDUCATION */}
      <Section title="Academic Details" icon={<FaGraduationCap />}>
        <div className="grid md:grid-cols-3 gap-4">
          <Field name="tenthPercentage" placeholder="10th %" type="number" />
          <Field name="twelfthPercentage" placeholder="12th %" type="number" />
          <Field name="cgpa" placeholder="CGPA" type="number" />
        </div>
      </Section>

      {/* LINKS */}
      <Section title="Social & Coding Profiles" icon={<FaLink />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Field name="linkedIn" placeholder="LinkedIn URL" />
          <Field name="github" placeholder="GitHub URL" />
          <Field name="portfolio" placeholder="Portfolio URL" />
          <Field name="codingProfile" placeholder="Coding Profile (LeetCode / HR)" />
        </div>
      </Section>
    </div>
  );
}

export default ProfilePage;
