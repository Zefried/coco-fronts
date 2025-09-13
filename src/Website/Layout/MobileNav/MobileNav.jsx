import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch, FiShoppingBag, FiHeart, FiUser, FiX, FiLogOut, FiLogIn, FiSettings, FiHelpCircle, FiInfo } from 'react-icons/fi';
import './MobileNav.css';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const MobileBottomNav = () => {
  const [cartCount, setCartCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  
  useEffect(() => {
    const state = AuthAction.getState('sunState');
    let activeCart = [];

    if (state.isAuthenticated) {
      const userCart = Array.isArray(state.cart) ? state.cart : [];
      const guestCart = Array.isArray(state.guestCart) ? state.guestCart : [];

      if (userCart.length > 0 && guestCart.length > 0) {
        const merged = [...userCart];
        guestCart.forEach(gItem => {
          if (!merged.some(uItem => uItem.product_id === gItem.product_id)) {
            merged.push(gItem);
          }
        });
        activeCart = merged;
      } else {
        activeCart = userCart.length > 0 ? userCart : guestCart;
      }
    } else {
      activeCart = Array.isArray(state.guestCart) ? state.guestCart : [];
    }

    setCartCount(activeCart.length);

    const handleCartUpdate = () => {
      const s = AuthAction.getState('sunState');
      let updatedCart = [];

      if (s.isAuthenticated) {
        const userCart = Array.isArray(s.cart) ? s.cart : [];
        const guestCart = Array.isArray(s.guestCart) ? s.guestCart : [];

        if (userCart.length > 0 && guestCart.length > 0) {
          const merged = [...userCart];
          guestCart.forEach(gItem => {
            if (!merged.some(uItem => uItem.product_id === gItem.product_id)) {
              merged.push(gItem);
            }
          });
          updatedCart = merged;
        } else {
          updatedCart = userCart.length > 0 ? userCart : guestCart;
        }
      } else {
        updatedCart = Array.isArray(s.guestCart) ? s.guestCart : [];
      }

      setCartCount(updatedCart.length);
    };

    window.addEventListener('cartCountUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartCountUpdated', handleCartUpdate);
  }, []);


  const handleLogout = () => {
    const state = AuthAction.getState('sunState');

    if (state.isAuthenticated) {
      AuthAction.resetState(); // Clears user session and cart
      alert('Logged out successfully')
    } else {
      window.location.href = '/user-login'; // Redirect guest to login
    }
    setShowModal(false); // Close bottom sheet
  };

  return (
    <>
      <nav className="mobile-bottom-nav">
        <Link 
          to="/" 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <div className="nav-icon-container">
            <FiHome className="nav-icon" />
          </div>
          <span className="nav-label">Home</span>
        </Link>
        
        <Link 
          to="/cart" 
          className={`nav-item ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          <div className="nav-icon-container">
            <FiShoppingBag className="nav-icon" />
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="nav-label">Cart</span>
        </Link>
        
        <Link 
          to="#" 
          className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('wishlist')}
        >
          <div className="nav-icon-container">
            <FiHeart className="nav-icon" />
          </div>
          <span className="nav-label">Wishlist</span>
        </Link>
        
        <div 
          className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('account');
            setShowModal(true);
          }}
        >
          <div className="nav-icon-container">
            <FiUser className="nav-icon" />
          </div>
          <span className="nav-label">Account</span>
        </div>
      </nav>
      
      {showModal && (
        <div className="bottomsheet-overlay" onClick={() => setShowModal(false)}>
          <div className="bottomsheet-content" onClick={(e) => e.stopPropagation()}>
            {/* Sheet handle */}
            <div className="sheet-handle"></div>
            
            {/* Close button */}
            <button className="sheet-close-btn" onClick={() => setShowModal(false)}>
              <FiX />
            </button>
            
            {/* Profile section */}
            <div className="sheet-section">
              <div className="sheet-header">
                <h3>My Account</h3>
              </div>
              
              {AuthAction.getState('sunState')?.isAuthenticated ? (
                <>
                  <div className="profile-info">
                    <div className="profile-avatar">
                      <FiUser />
                    </div>
                    <div className="profile-details">
                      <h4>Welcome back!</h4>
                      <p>View and manage your account</p>
                    </div>
                  </div>
                  
                  <button className="sheet-btn logout" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="profile-info">
                    <div className="profile-avatar guest">
                      <FiUser />
                    </div>
                    <div className="profile-details">
                      <h4>Guest Account</h4>
                      <p>Please log in to access your account</p>
                    </div>
                  </div>
                  
                  <Link to="/user-login" className="sheet-btn login" onClick={() => setShowModal(false)}>
                    <FiLogIn /> Login / Sign Up
                  </Link>
                </>
              )}
            </div>
            
            {/* Orders section */}
            <div className="sheet-section">
              <h3>Orders</h3>
              <Link to="/orders" className="sheet-link" onClick={() => setShowModal(false)}>
                <FiShoppingBag /> My Orders
              </Link>
            </div>
            
            {/* Settings section */}
            {/* <div className="sheet-section">
              <h3>Settings</h3>
              <Link to="/settings" className="sheet-link" onClick={() => setShowModal(false)}>
                <FiSettings /> Account Settings
              </Link>
              <Link to="/notifications" className="sheet-link" onClick={() => setShowModal(false)}>
                <FiSettings /> Notification Preferences
              </Link>
            </div> */}
            
            {/* Support section */}
            <div className="sheet-section">
              <h3>Support</h3>
              <Link to="/contact" className="sheet-link" onClick={() => setShowModal(false)}>
                <FiHelpCircle /> Help Center
              </Link>
              <Link to="/about" className="sheet-link" onClick={() => setShowModal(false)}>
                <FiInfo /> About Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomNav;