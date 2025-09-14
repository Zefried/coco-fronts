import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const SidebarNew = ({ isOpen }) => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const handleLogout = () => {
    const state = AuthAction.getState('sunState');

    if (state.isAuthenticated) {
      AuthAction.resetState(); // Clears user session and cart
      alert('Logged out successfully')
      window.location.href = '/admin-login'; // Redirect guest to login
    } else {
      window.location.href = '/admin-login'; // Redirect guest to login
    }
  };
  
  return (
    <div className={`sb-sidebar ${isOpen ? 'sb-open' : ''}`}>
      <div className="sb-sidebar-header">
        <div className="sb-logo-container">
          <div className="sb-logo">M</div>
          <span className="sb-app-name">MyApp</span>
        </div>
      </div>
      
      <nav className="sb-sidebar-nav">
        <ul className="sb-sidebar-list">
          <li>
            <Link to="/admin" className="sb-menu-item">
              <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H15.5C16.3284 3 17 3.67157 17 4.5V7.5C17 8.32843 16.3284 9 15.5 9H4.5C3.67157 9 3 8.32843 3 7.5V4.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12.5C3 11.6716 3.67157 11 4.5 11H9.5C10.3284 11 11 11.6716 11 12.5V15.5C11 16.3284 10.3284 17 9.5 17H4.5C3.67157 17 3 16.3284 3 15.5V12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 12.5C13 11.6716 13.6716 11 14.5 11H15.5C16.3284 11 17 11.6716 17 12.5V15.5C17 16.3284 16.3284 17 15.5 17H14.5C13.6716 17 13 16.3284 13 15.5V12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Dashboard</span>
            </Link>
          </li>
          
          {/* Category Master */}
          <li>
            <div className="sb-parent">
              <button 
                className="sb-dropdown" 
                onClick={() => setIsUsersOpen(!isUsersOpen)}
                aria-expanded={isUsersOpen}
              >
                <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Masters</span>
                <svg className={`sb-arrow ${isUsersOpen ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <ul className={`sb-submenu ${isUsersOpen ? 'sb-submenu-open' : ''}`}>
                <li>
                  <Link to="/admin/add-category" className="sb-submenu-item">
                    Add Category
                  </Link>
                </li>
                <li>
                  <Link to="/admin/view-category" className="sb-submenu-item">
                    View Category
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          {/* ends here */}

          {/* Product Master */}
          <li>
            <div className="sb-parent">
              <button 
                className="sb-dropdown" 
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                aria-expanded={isProductsOpen}
              >
                <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 6H17M3 10H17M3 14H17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Products</span>
                <svg className={`sb-arrow ${isProductsOpen ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <ul className={`sb-submenu ${isProductsOpen ? 'sb-submenu-open' : ''}`}>
                <li>
                  <Link to="/admin/add-product" className="sb-submenu-item">
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link to="/admin/view-product" className="sb-submenu-item">
                    View Products
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          {/* Ends here */}


          {/* Orders Master */}
          <li>
            <div className="sb-parent">
              <button 
                className="sb-dropdown" 
                onClick={() => setIsOrdersOpen(!isOrdersOpen)}
                aria-expanded={isOrdersOpen}
              >
                <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 2H14V4H6V2Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 4H16V18H4V4Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 8H12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Orders</span>
                <svg className={`sb-arrow ${isOrdersOpen ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <ul className={`sb-submenu ${isOrdersOpen ? 'sb-submenu-open' : ''}`}>
                <li>
                  <Link to="/admin/view-orders" className="sb-submenu-item">
                    View Orders
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          {/* ends here */}
          

        </ul>
      </nav>
      
      <div className="sb-sidebar-footer">
        <div className="sb-user-profile">
          <div className="sb-user-avatar">S</div>
          <div className="sb-user-info">
            <div className="sb-user-name">SUNCLAY STUDIO </div>
            <div className="sb-user-role">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarNew;