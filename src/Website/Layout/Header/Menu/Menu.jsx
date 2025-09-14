// Menu.js
import React from 'react';
import './Menu.css';

const Menu = ({ categories, isMobile }) => {
  return (
    <div className={`menu-container ${isMobile ? 'mobile-menu-container' : ''}`}>
      {!isMobile && <p><strong>Menu</strong></p>}
      <div className="menu-grid">
        {categories.map(cat => (
          <a key={cat.id} href={`/category/${cat.slug}`}>
            {cat.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Menu;