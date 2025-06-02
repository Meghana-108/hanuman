import React, { useEffect, useState } from "react";
import axios from "axios";

const FisherDashboard = () => {
  const [fishList, setFishList] = useState([]);
  const [editingFishId, setEditingFishId] = useState(null);
  const [formData, setFormData] = useState({
    fishName: "",
    location: "",
    price: "",
    status: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No auth token found. Please login.");
      return;
    }
    fetchFish();
  }, [token]);

  const fetchFish = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fish", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFishList(res.data);
    } catch (err) {
      console.error("Error fetching fish:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (editingFishId) return;

    try {
      await axios.delete(`http://localhost:5000/api/fish/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFishList((prev) => prev.filter((fish) => fish._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  const handleEditClick = (fish) => {
    setEditingFishId(fish._id);
    setFormData({
      fishName: fish.fishName,
      location: fish.location,
      price: fish.price,
      status: fish.status,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/fish/${editingFishId}`,
        { ...formData, price: Number(formData.price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingFishId(null);
      setFormData({ fishName: "", location: "", price: "", status: "" });
      fetchFish();
    } catch (err) {
      console.error("Edit error:", err.response?.data || err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingFishId(null);
    setFormData({ fishName: "", location: "", price: "", status: "" });
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen relative">
      {/* Fish cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0">
        {fishList.map((fish) => (
          <div
            key={fish._id}
            className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg"
          >
            <img
              src={`http://localhost:5000${fish.imageUrl}`}
              alt={fish.fishName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-700">{fish.fishName}</h2>
              <p className="text-gray-600">📍 {fish.location}</p>
              <p className="text-gray-800 font-medium">💰 ₹{fish.price} per 1K</p>
              <p className="text-sm text-blue-600">Status: {fish.status}</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEditClick(fish)}
                  className="text-white bg-yellow-500 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(fish._id)}
                  className="text-white bg-red-500 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal with overlay */}
      {editingFishId && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
          }}
        >
          <form
            onSubmit={handleEditSubmit}
            style={{
              backgroundColor: "white",
              padding: 24,
              borderRadius: 12,
              width: "100%",
              maxWidth: 400,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">Edit Fish Details</h2>
            <input
              type="text"
              placeholder="Fish Name"
              value={formData.fishName}
              onChange={(e) => setFormData({ ...formData, fishName: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              required
              min="0"
            />
            <input
              type="text"
              placeholder="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FisherDashboard;
