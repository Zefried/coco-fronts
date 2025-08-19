import React, { useState, useEffect } from 'react';
import { FiShoppingBag, FiMenu, FiX, FiUser } from 'react-icons/fi';
import './Header.css';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  useEffect(() => {
    const fullState = AuthAction.getState('sunState');
    const activeCart = Array.isArray(fullState.guestCart) && fullState.guestCart.length ? fullState.guestCart : fullState.cart;
    setCartItems(activeCart.length);

    const handleCartUpdate = (e) => {
      const state = AuthAction.getState('sunState');
      const updatedCart = Array.isArray(state.guestCart) && state.guestCart.length ? state.guestCart : state.cart;
      setCartItems(updatedCart.length);
    };

    window.addEventListener('cartCountUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartCountUpdated', handleCartUpdate);
  }, []);

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
            {/* <li><a href="/collections">Collections</a></li> */}
            <li><a href="/about">About</a></li>
            <li><a href="/journal">Journal</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>

        {/* Cart and User */}
        <div className="header-icons">
          <div className="cart">
            <a href="/cart" className="cart-link">
              <FiShoppingBag size={20} />
              {cartItems > 0 && <span className="cart-count">{cartItems}</span>}
            </a>
          </div>
          
        {/* User Login & Logout */}
          <div className="user-login">
            <div className="user-icon" onClick={() => setIsUserModalOpen(!isUserModalOpen)}>
              <FiUser size={20} />
            </div>
            {isUserModalOpen && (
              <div className="user-modal">
                <button
                  className="auth-button"
                  onClick={() => {
                    const state = AuthAction.getState('sunState');
                    if(state.isAuthenticated){
                      AuthAction.resetState();
                    } else {
                      window.location.href = '/user-login'; // login
                    }
                    setIsUserModalOpen(false);
                  }}
                >
                  {AuthAction.getState('sunState').isAuthenticated ? 'Logout' : 'Login'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Menu (shown when toggled) */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <nav>
            <ul>
              <li><a href="/shop" onClick={toggleMenu}>Shop</a></li>
              {/* <li><a href="/collections" onClick={toggleMenu}>Collections</a></li> */}
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