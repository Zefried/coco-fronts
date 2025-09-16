import React, { useEffect, useState } from 'react';
import './BestSellers.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const BestSellers = () => {

  const [bestSeller, setBestSeller] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get('/api/best-sellers');
        if (res.data.status === 200) {
           setBestSeller(res.data.data.slice(0, 8));
        }
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      }
    };

    fetchBestSellers();
  }, []);

  const handleNavigate = (id) => {
    console.log('Best Seller ID:', id);
    navigate(`product-detail/${id}`);
  };

  return (
    <section className="bs-section">
      <div className="bs-container">
        <div className="bs-header">
          <h2 className="bs-title">BESTSELLERS</h2>
        </div>
        {/* v1.2 */}
        <div className="bs-grid">
          {bestSeller.length > 0 ? (
            bestSeller.map((product) => (
              <div 
                className="bs-card" 
                key={product.id}
                onClick={() => handleNavigate(product.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="bs-image-wrapper">
                  {/* <img 
                    src={`http://127.0.0.1:8000/images/${product.images[0].image}`} 
                    alt={product.name} 
                    className="bs-image"
                    loading="lazy"
                  /> */}
                   <img 
                    src={`https://backendsunclaystudio.space/images/${product.images[0].image}`} 
                    alt={product.name} 
                    className="bs-image"
                    loading="lazy"
                  />
                </div>
                <div className="bs-info">
                  <h3 className="bs-name">{product.name}</h3>
                  <div className="bs-price">{product.price}</div>
                </div>
              </div>
            ))
          ) : (
            <p>No bestsellers available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
