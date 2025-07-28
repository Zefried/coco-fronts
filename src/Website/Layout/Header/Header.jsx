import React, { useState } from 'react';
import { FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(0); // You can manage this with state/context later

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      
      <div className="divider">
        <p className='header-top-text'>ENJOY FREE SHIPPING ON ORDERS OVER ₹999</p>
      </div>

      <div className="header-container">
        {/* Mobile menu button (hidden on desktop) */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo */}
        <div className="logo">
          <a href="/">Sunclay</a>
        </div>

        {/* Desktop Navigation */}
        <nav className={`desktop-nav ${isMenuOpen ? 'mobile-visible' : ''}`}>
          <ul>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/collections">Collections</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/journal">Journal</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>

        {/* Cart */}
        <div className="cart">
          <a href="/cart" className="cart-link">
            <FiShoppingBag size={20} />
            {cartItems > 0 && <span className="cart-count">{cartItems}</span>}
          </a>
        </div>
      </div>

      {/* Mobile Menu (shown when toggled) */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <nav>
            <ul>
              <li><a href="/shop" onClick={toggleMenu}>Shop</a></li>
              <li><a href="/collections" onClick={toggleMenu}>Collections</a></li>
              <li><a href="/about" onClick={toggleMenu}>About</a></li>
              <li><a href="/journal" onClick={toggleMenu}>Journal</a></li>
              <li><a href="/contact" onClick={toggleMenu}>Contact</a></li>
            </ul>
          </nav>
        </div>
      )}

    </header>
  );
};

export default Header;