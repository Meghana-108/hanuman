import React, { useEffect, useState } from "react";
import axios from "axios";

const FisherDashboard = () => {
  const [fishList, setFishList] = useState([]);

  useEffect(() => {
    const fetchFish = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/fish", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFishList(res.data);
      } catch (err) {
        console.error("Error fetching fish:", err);
      }
    };

    fetchFish();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-blue-50 min-h-screen">
      {fishList.map((fish) => (
        <div
          key={fish._id}
          className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg"
        >
         <img src={`http://localhost:5000${fish.imageUrl}`} alt={fish.fishName} className="w-full h-48 object-cover" />

          <div className="p-4">
            <h2 className="text-xl font-bold text-blue-700">{fish.fishName}</h2>
            <p className="text-gray-600">📍 {fish.location}</p>
            <p className="text-gray-800 font-medium">💰 ₹{fish.price} per 1K</p>
            <p className="text-sm text-blue-600">Status: {fish.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FisherDashboard;
