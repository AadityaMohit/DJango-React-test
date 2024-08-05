import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CompanyPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/products/?company=${id}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div>
      <h1>Products for Company {id}</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.category}</li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyPage;

