import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated. Please login.');
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:5000/api/fishes/price-range-chart', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          const chartData = res.data.data.map(item => ({
            ...item,
            priceRange: item.maxPrice - item.minPrice
          }));
          setData(chartData);
          setError(null);
        } else {
          setError('Failed to fetch chart data from server.');
        }
      } catch (err) {
        setError('Error fetching chart data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-info text-center mb-4 fw-bold">Fish Price Analytics</h2>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading data, please wait...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-center text-muted">No data available to display.</p>
      )}

      {!loading && !error && data.length > 0 && (
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
            <Bar dataKey="minPrice" stackId="a" fill="#0dcaf0" name="Min Price" />
            <Bar dataKey="priceRange" stackId="a" fill="#0d6efd" name="Price Range" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
};

export default PriceAnalytics;
