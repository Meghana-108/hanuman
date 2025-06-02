// PriceAnalytics.jsx
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const PriceAnalytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
  console.log('useEffect triggered'); // <-- add this to check if useEffect runs
  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token); // check token

      const res = await axios.get('http://localhost:5000/api/fishes/price-range-chart', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        console.log("Received data:", res.data.data);
        setData(res.data.data);
      } else {
        console.error('Failed to fetch chart data');
      }
    } catch (err) {
      console.error('Error fetching chart data:', err.message);
    }
  };

  fetchAnalytics();
}, []);

  return (
    <Container className="py-5">
      <h2 className="text-primary text-center mb-4 fw-bold">Fish Price Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 50, left: 50, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={['auto', 'auto']}
            label={{ value: 'Price (₹)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="minPrice" stackId="a" fill="#90caf9" name="Min Price" />
          <Bar
            dataKey={(entry) => entry.maxPrice - entry.minPrice}
            stackId="a"
            fill="#1976d2"
            name="Price Range"
          />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default PriceAnalytics;
