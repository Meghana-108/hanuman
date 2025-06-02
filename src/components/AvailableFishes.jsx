// src/pages/AvailableFishes.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AvailableFishes = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    axios.get('/api/fish-quantity-summary')
      .then(res => {
        console.log('API Response:', res.data); // Debug log

        // Adjust based on API structure
        const fishData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
            ? res.data.data
            : [];

        const labels = fishData.map(item => item.fishName);
        const quantities = fishData.map(item => item.quantity);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Upload Count',
              data: quantities,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  return (
    <Container className="pt-5">
      <h2 className="text-center text-success fw-bold mb-4">Available Fish Quantity Chart</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: 'top' },
            tooltip: { enabled: true }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Uploads'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Fish Name'
              }
            }
          }
        }}
      />
    </Container>
  );
};

export default AvailableFishes;
