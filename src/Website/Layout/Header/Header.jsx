import React, { useState, useEffect } from 'react';
import { FiShoppingBag, FiMenu, FiX, FiUser } from 'react-icons/fi';
import './Header.css';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';
import Menu from './Menu/Menu';
import axios from 'axios';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isDesktop;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isDesktop = useIsDesktop();
  
  // Cart logic remains unchanged
  useEffect(() => {
    const state = AuthAction.getState();
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
    setCartItems(activeCart.length);
    
    const handleCartUpdate = () => {
      const s = AuthAction.getState();
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
      setCartItems(updatedCart.length);
    };
    
    window.addEventListener('cartCountUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartCountUpdated', handleCartUpdate);
  }, []);
  
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset mobile submenu when closing main menu
    if (isMenuOpen) {
      setShowMenu(false); // Reset submenu state
    }
    if (!isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };
  
  const { token } = AuthAction.getState('sunState');
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    if (categories.length > 0) return;
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const simplified = res.data.data.map(cat => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug
        }));
        setCategories(simplified);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, [token, categories]);
   
  return (
    <header className="header">
      <div className="divider">
        <p className='header-top-text'>ENJOY FREE SHIPPING ON ORDERS OVER ₹999</p>
      </div>
      <div className="header-container">
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className="logo"><a href="/">Sunclay</a></div>
        <nav className={`desktop-nav ${isMenuOpen ? 'mobile-visible' : ''}`}>
          <ul>
            <li
              onMouseEnter={() => {
                clearTimeout(window.menuTimeout);
                isDesktop && setShowDesktopMenu(true);
              }}
              onMouseLeave={() => {
                if (isDesktop) {
                  window.menuTimeout = setTimeout(() => setShowDesktopMenu(false), 300);
                }
              }}
            >
              <a href="/">Shop</a>
              {showDesktopMenu && <Menu categories={categories} isMobile={false} />}
            </li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <div className="header-icons">
          <div className="cart">
            <a href="/cart" className="cart-link">
              <FiShoppingBag size={20} />
              {cartItems > 0 && <span className="cart-count">{cartItems}</span>}
            </a>
          </div>
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
                    if(state.isAuthenticated) AuthAction.resetState();
                    else window.location.href = '/user-login';
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
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <button className="close-menu" onClick={toggleMenu}>
              <FiX size={24} />
            </button>
            <nav>
              <ul>

                <li>
                  <a
                    className="mobile-submenu-btn" 
                    onClick={(e) => {
                      e.preventDefault();
                      setShowMobileMenu(!showMobileMenu);
                    }}
                  >
                    Shop
                    <span className={`submenu-arrow ${showMobileMenu ? 'open' : ''}`}></span>
                  </a>
                  {showMobileMenu && <Menu categories={categories} isMobile={true} />}
                </li>

                <li><a href="/about" onClick={toggleMenu}>About</a></li>
                <li><a href="/contact" onClick={toggleMenu}>Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;