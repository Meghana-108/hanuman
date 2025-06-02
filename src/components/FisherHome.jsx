import React from "react";
import { Link } from "react-router-dom";

const FisherHome = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')", // Replace with your own fishing image
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Box */}
      <div className="relative z-10 backdrop-blur-md bg-white bg-opacity-20 text-center rounded-2xl p-10 shadow-xl max-w-xl">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome, Fishermen!
        </h1>
        <p className="text-lg text-gray-200 mb-6">
          Join our community of passionate fishermen. Share your catches, explore top fishing spots, and connect with fellow enthusiasts.
        </p>
        <Link
  to="/option"
  className="bg-yellow-300 text-gray-900 font-semibold py-2 px-6 rounded-full shadow hover:bg-yellow-400 transition duration-300"
>
  Get Started
</Link>
      </div>
    </div>
  );
};

export default FisherHome;