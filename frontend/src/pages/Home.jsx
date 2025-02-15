import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Header */}
      <header className="w-full flex justify-between items-center shadow-lg px-6 sm:px-16 py-4 bg-white">
        <div className="text-2xl sm:text-3xl font-bold text-blue-700">
          💸 Payments App
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 transition-all duration-300 shadow-md"
          >
            Signup
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-6 py-2 transition-all duration-300 shadow-md"
          >
            Signin
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-10">
        <h1 className="font-bold text-3xl sm:text-4xl text-gray-800 mb-3 animate-fade-in">
          Welcome to <span className="text-blue-700">Payments App</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl">
          A <span className="font-semibold">safe</span> and <span className="font-semibold">secure</span> way to transfer your hard-earned money.
        </p>
        <p className="text-md sm:text-lg text-gray-600 mb-6 max-w-lg">
          Easily manage your finances, track your spending, and make transactions with just a few clicks.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Get Started 🚀
        </button>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white py-4 flex justify-center items-center shadow-inner">
        <div className="text-sm text-gray-500">
          © 2024 <span className="font-semibold text-blue-600">Payments App</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
