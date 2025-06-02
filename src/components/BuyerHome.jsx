import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BuyerHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="font-sans min-h-screen flex flex-col text-white">
      {/* Top bar */}
      <div className="bg-cyan-600 text-sm text-white text-center py-1">
        # 22 St. Black Road Raleigh, PA 34578
      </div>

      {/* Navigation */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md text-gray-700">
        <div className="text-cyan-600 text-2xl font-bold">⚓ FishTank</div>
        <nav className="space-x-6 text-sm">
          <Link to="/" className="hover:text-cyan-600">Home</Link>
          <Link to="/about" className="hover:text-cyan-600">About Us</Link>
          <Link to="/club" className="hover:text-cyan-600">Club</Link>
          <Link to="/pricing" className="hover:text-cyan-600">Pricing</Link>
          <Link to="/gallery" className="hover:text-cyan-600">Gallery</Link>
          <Link to="/blog" className="hover:text-cyan-600">Blog</Link>
          <Link to="/contact" className="hover:text-cyan-600">Contact</Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 font-semibold hover:underline ml-4"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Hero + Offer Section in Full Screen */}
      <main
        className="flex-grow relative bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage: 'url(https://i.pinimg.com/736x/ad/8e/97/ad8e974a82efd6e89c01ec32004c0075.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl md:text-5xl italic font-semibold mb-2">Partake In Our</h2>
          <h1 className="text-3xl md:text-4xl font-bold uppercase mb-6">Multiple Fishing Competitions!</h1>
          <Link
            to="/browse"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-full transition"
          >
            More Info
          </Link>

          <div className="mt-12 bg-white bg-opacity-90 text-gray-800 rounded-xl px-6 py-6 shadow-lg">
            <h3 className="text-lg text-cyan-600 italic">What Our Fishing</h3>
            <h2 className="text-xl font-bold mb-2">Club Has To Offer!</h2>
            <p className="text-sm text-gray-600">
              Besides providing the fishing equipment for rent and organizing tours, we also offer lots of training!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyerHome;
