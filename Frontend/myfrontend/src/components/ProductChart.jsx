import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ProductChart({ companyId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/products/?company=${companyId}`);
        const categories = {};
        response.data.forEach(product => {
          categories[product.category] = (categories[product.category] || 0) + 1;
        });
        setData(Object.entries(categories));
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  const chartData = {
    labels: data.map(item => item[0]),
    datasets: [{
      label: 'Number of Products',
      data: data.map(item => item[1]),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div>
      <h2>Product Categories</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Bar data={chartData} />
    </div>
  );
}

export default ProductChart;
