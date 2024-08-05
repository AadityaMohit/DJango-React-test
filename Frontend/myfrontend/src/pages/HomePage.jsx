// HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/companies/')
      .then(response => setCompanies(response.data))
      .catch(error => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  const handleSearch = () => {
    navigate(`/company/${selectedCompany}`);
  };

  return (
    <div>
      <nav>
        {/* Navbar code here */}
      </nav>
      <header>
        <h1>Welcome to Our E-commerce Site</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products..."
        />
        <select onChange={(e) => setSelectedCompany(e.target.value)}>
          <option value="">Select Company</option>
          {companies.map(company => (
            <option key={company.id} value={company.id}>{company.name}</option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </header>
      <main>
        {/* Other content here */}
      </main>
    </div>
  );
}

export default HomePage;
