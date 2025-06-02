import React from "react";
import { Link } from "react-router-dom";

const Option = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-6 py-12">
      
      {/* Side Border */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-b from-gray-800 to-gray-600 shadow-xl z-10 rounded-tr-3xl rounded-br-3xl"></div>

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-6xl w-full space-y-12">
        <h2 className="text-4xl font-extrabold text-blue-800 tracking-wide drop-shadow">
          Choose Your Action
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Add Fish Details Box */}
          <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 transform transition duration-300 hover:scale-105 flex flex-col items-center">
            <img
              src="https://i.pinimg.com/736x/2c/7e/66/2c7e6661e03e1f5bb55950b4d70febdc.jpg"
              alt="Add Fish"
              className="h-29 w-29 mb-4"
            />
            <h3 className="text-2xl font-bold text-blue-700 mb-2">Add Fish Details</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-center">
              Log the fish you've caught — species, weight, location, and more.
            </p>
            <Link
              to="/FishDetails"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full font-medium shadow-md transition"
            >
              Add Details
            </Link>
          </div>

          {/* Price Analytics Box */}
          <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 transform transition duration-300 hover:scale-105 flex flex-col items-center">
            <img
              src="https://i.pinimg.com/736x/14/b1/dd/14b1ddc2e255ff9af2cbbdbd5e861379.jpg"
              alt="Analytics"
              className="h-25 w-25 mb-4"
            />
            <h3 className="text-2xl font-bold text-green-700 mb-2">Price Analytics</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-center">
              Analyze market trends to optimize your fish pricing strategy.
            </p>
            <Link
              to="/priceanalytics"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full font-medium shadow-md transition"
            >
              View Analytics
            </Link>
          </div>

          {/* Dashboard Box */}
          <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 transform transition duration-300 hover:scale-105 flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
              alt="Dashboard"
              className="h-24 w-24 mb-4"
            />
            <h3 className="text-2xl font-bold text-purple-700 mb-2">Dashboard</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-center">
              View an overview of your fishing activities and insights.
            </p>
            <Link
              to="/dashboard"
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full font-medium shadow-md transition"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Option;
