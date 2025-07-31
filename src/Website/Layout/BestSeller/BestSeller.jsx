import React from 'react';
import './BestSellers.css';

const BestSellers = () => {
  const products = [
    {
      id: 1,
      name: 'NERVIO KNIFE & SERVER',
      price: '¥ 1.300',
      img:'https://i.pinimg.com/736x/ee/aa/02/eeaa0244e99f24265a6eaf273d2867f8.jpg'
    },
    {
      id: 2,
      name: 'ELAN COUPE GLASS',
      price: '¥ 1.600',
      img:'https://i.pinimg.com/736x/57/66/ed/5766ed35d88c09b04e2dc730303e48cf.jpg'
    },
    {
      id: 3,
      name: 'SAUDADE GLASSES',
      price: '¥ 1.920',
      img:'https://i.pinimg.com/736x/29/a4/11/29a4115253a6e808ac2d568086b33b86.jpg'
    },
    {
      id: 4,
      name: 'LAMERA PITCHER',
      price: '¥ 600',
      img:'https://i.pinimg.com/736x/ef/f0/ac/eff0ac14793d75d7f63c1549148817fb.jpg'
    },
  ];

  return (
    <section className="bs-section">
      <div className="bs-container">
        <div className="bs-header">
          <h2 className="bs-title">BESTSELLERS</h2>
        </div>
        
        <div className="bs-grid">
          {products.map((product) => (
            <div className="bs-card" key={product.id}>
              <div className="bs-image-wrapper">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="bs-image"
                  loading="lazy" // Better mobile performance
                />
              </div>
              <div className="bs-info">
                <h3 className="bs-name">{product.name}</h3>
                <div className="bs-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;