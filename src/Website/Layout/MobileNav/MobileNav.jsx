import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch, FiShoppingBag, FiHeart, FiUser } from 'react-icons/fi';
import './MobileNav.css';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const MobileBottomNav = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Initial cart count - changed to count unique products instead of total quantity
    const fullState = AuthAction.getState('sunState');
    const currentCart = Array.isArray(fullState.guestCart) ? fullState.guestCart : [];
    const initialCount = currentCart.length; // Changed from reduce to length
    setCartCount(initialCount);

    // Event listener for cart updates
    const handleCartUpdate = (e) => {
      setCartCount(e.detail.count);
    };

    window.addEventListener('cartCountUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartCountUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <nav className="mobile-bottom-nav">
      <Link to="/" className="nav-item">
        <FiHome className="nav-icon" />
        <span className="nav-label">Home</span>
      </Link>
      <Link to="/search" className="nav-item">
        <FiSearch className="nav-icon" />
        <span className="nav-label">Search</span>
      </Link>
      <Link to="/cart" className="nav-item">
        <div className="cart-icon-wrapper">
          <FiShoppingBag className="nav-icon" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
        <span className="nav-label">Cart</span>
      </Link>
      <Link to="/wishlist" className="nav-item">
        <FiHeart className="nav-icon" />
        <span className="nav-label">Wishlist</span>
      </Link>
      <Link to="/account" className="nav-item">
        <FiUser className="nav-icon" />
        <span className="nav-label">Account</span>
      </Link>
    </nav>
  );
};

export default MobileBottomNav;