import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecruiterLandingPage = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isRegister) {
        response = await axios.post(
          "http://localhost:8080/api/recruiters/register",
          formData
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/api/recruiters/login",
          { email: formData.email, password: formData.password }
        );
      }

      localStorage.setItem("recruiter", JSON.stringify(response.data));
      navigate("/recruiter/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
      {/* White card */}
      <div className="bg-white shadow-2xl rounded-xl max-w-md w-full overflow-hidden min-h-[550px] flex flex-col justify-center">
        <div className="px-10 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {isRegister ? "Recruiter Registration" : "Recruiter Login"}
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            {isRegister
              ? "Create your recruiter account to post jobs and manage applications."
              : "Login to manage your jobs and view applications."}
          </p>

          {error && (
            <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {isRegister && (
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-600 cursor-pointer font-semibold hover:underline"
            >
              {isRegister ? "Login" : "Register"}
            </span>
          </p>
        </div>

        <div className="bg-blue-50 px-10 py-4 text-center text-gray-600 text-sm">
          SmartJob Portal &copy; 2026
        </div>
      </div>
    </div>
  );
};

export default RecruiterLandingPage;
