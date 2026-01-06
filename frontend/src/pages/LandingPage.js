import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-blue-600">Smart Job Portal</h1>
                <nav>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-4 transition duration-300"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition duration-300"
                    >
                        Register
                    </button>
                    <button
  onClick={() => navigate('/recruiter-landing')}
  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mr-4 transition duration-300"
>
  Recruiter Login / Register
</button>

                </nav>
            </header>

            {/* Hero Section */}
            <section className="flex-1 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 p-10 md:p-20 text-white">
                <div className="md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Find Your Dream Job
                    </h2>
                    <p className="mb-8 text-lg md:text-xl">
                        Apply to top companies, track your applications, and get hired faster.
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-800 text-white font-semibold py-3 px-6 rounded shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            Login
                        </button>
                    </div>
                </div>

                <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                    <img
                        src="/assets/hero.png" // ✅ public folder path
                        alt="Job portal illustration"
                        className="rounded-xl shadow-lg max-w-sm md:max-w-md h-auto object-contain"
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="p-6 bg-white text-center text-gray-500 shadow-inner">
                © 2025 Smart Job Portal. All rights reserved.
            </footer>
        </div>
    );
}

export default LandingPage;
