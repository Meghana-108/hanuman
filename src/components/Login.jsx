import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded.role;
        if (role === "buyer") {
          navigate("/buyerhome");
        } else if (role === "fishermen") {
          navigate("/fishermenhome");
        } else {
          navigate("/dashboard");
        }
      } catch (e) {
        console.error("Invalid token:", e);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/buyerlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // optional if you want user info

        try {
          const decoded = jwtDecode(data.token);
          const role = decoded.role;
          if (role === "buyer") {
            navigate("/buyerhome");
          } else if (role === "fishermen") {
            navigate("/fishermenhome");
          } else {
            navigate("/dashboard");
          }
        } catch (e) {
          console.error("Failed to decode token:", e);
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left image section */}
      <div className="hidden md:flex w-1/2 bg-sky-400 items-center justify-center">
        <img
          src="https://i.pinimg.com/736x/48/17/2d/48172dc2448b4bb1dcce3ef929ab3082.jpg"
          alt="Login Illustration"
          className="w-3/4"
        />
      </div>

      {/* Login form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-sky-50 px-8 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold text-center text-sky-600 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Please login to your account
          </p>

          {error && (
            <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-sky-600" />
                <span>Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-sky-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
