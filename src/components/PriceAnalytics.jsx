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
    console.log("hello")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);

        const res = await axios.get('http://localhost:5000/api/fishes/price-range-chart', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          // Add priceRange field = maxPrice - minPrice
          const chartData = res.data.data.map(item => ({
            ...item,
            priceRange: item.maxPrice - item.minPrice
          }));
          console.log("Received data:", chartData);
          setData(chartData);
        } else {
          console.error('Failed to fetch chart data');
        }
      } catch (err) {
        console.error('Error fetching chart data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-primary text-center mb-4 fw-bold">Fish Price Analytics</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
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
            <Bar dataKey="priceRange" stackId="a" fill="#1976d2" name="Price Range" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
};

export default PriceAnalytics;
