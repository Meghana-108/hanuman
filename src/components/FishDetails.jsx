import React, { useState } from "react";
import axios from "axios";

const FishDetails = () => {
  const [fishImage, setFishImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fishName, setFishName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFishImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    if (!fishImage || !fishName || !location || !price || !status) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fishImage", fishImage);
      formData.append("fishName", fishName);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("status", status);

      const token = localStorage.getItem("token"); // Make sure token is stored after login
     
      const response = await axios.post("http://localhost:5000/api/fish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include JWT
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        // Clear the form
        setFishImage(null);
        setPreviewImage(null);
        setFishName("");
        setLocation("");
        setPrice("");
        setStatus("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("Unauthorized. Please log in again.");
      } else {
        setError("Failed to upload. Please check your connection or server.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 text-center">🐟 Add Fish Details</h2>

        <div>
          <label className="block text-blue-600 font-semibold mb-2">Fish Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 h-40 w-full object-cover rounded-xl shadow"
            />
          )}
        </div>

        <div>
          <label className="block text-blue-600 font-semibold mb-2">Fish Name</label>
          <input
            type="text"
            value={fishName}
            onChange={(e) => setFishName(e.target.value)}
            placeholder="Enter fish name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-blue-600 font-semibold mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-blue-600 font-semibold mb-2">Price (per 1K)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-blue-600 font-semibold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select status</option>
            <option value="Fresh">Fresh</option>
            <option value="Frozen">Frozen</option>
            <option value="Salted">Salted</option>
            <option value="Dried">Dried</option>
          </select>
        </div>

        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {success && (
          <p className="text-green-600 font-semibold">
            🎉 Fish details submitted successfully!
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold text-lg hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FishDetails;
