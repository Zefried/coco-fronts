// Menu.js
import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = ({ categories, isMobile }) => {
  return (
    <div className={`menu-container ${isMobile ? 'mobile-menu-container' : ''}`}>
      {!isMobile && <p><strong>Menu</strong></p>}
      <div className="menu-grid">
        {categories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.slug}`}>
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;