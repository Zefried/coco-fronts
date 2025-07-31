import React, { useState, useEffect } from 'react';
import './Navbar.css';
import {  useDarkMode } from '../Darkmood/Darkmood';

const NavbarNew = ({ toggleSidebar }) => {
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Toggle user menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  
  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.nv-user-menu')) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <nav className={`nv-navbar ${isDarkMode ? 'dark' : ''}`} aria-label="Main navigation">
      <div className="nv-container">
        <div className="nv-left-section">
          <button 
            className="nv-hamburger" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar menu"
            aria-expanded="false"
          >
            <span className="nv-line"></span>
            <span className="nv-line"></span>
            <span className="nv-line"></span>
          </button>
          <div className="nv-brand">MyApp</div>
        </div>
        
        <div className="nv-center-section">
          <div className="nv-search-container">
            <input 
              type="text" 
              className="nv-search" 
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="nv-search-button" aria-label="Submit search">
              <svg className="nv-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.25 12.5A5.25 5.25 0 1 0 2 7.25a5.25 5.25 0 0 0 5.25 5.25zM13.5 13.5L11 11" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="nv-right-section">
          <button className="nv-icon-button" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5C6.41 2.5 3.5 5.41 3.5 9V13.5H2.5V15H17.5V13.5H16.5V9C16.5 5.41 13.59 2.5 10 2.5Z" fill="#6B7280"/>
              <path d="M7.5 16.5C7.5 17.6046 8.39543 18.5 9.5 18.5H10.5C11.6046 18.5 12.5 17.6046 12.5 16.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="nv-badge">3</span>
          </button>
          
          <button className="nv-icon-button" aria-label="Help">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 13.5V13.51" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 10C10.2652 10 10.5196 9.89464 10.7071 9.70711C10.8946 9.51957 11 9.26522 11 9C11 8.73478 10.8946 8.48043 10.7071 8.29289C10.5196 8.10536 10.2652 8 10 8C9.73478 8 9.48043 8.10536 9.29289 8.29289C9.10536 8.48043 9 8.73478 9 9C9 9.26522 9.10536 9.51957 9.29289 9.70711C9.48043 9.89464 9.73478 10 10 10Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Dark Mode Toggle Button */}
          <button 
            className="nv-icon-button" 
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C10 2 10.5 4.5 10.5 7C10.5 9.5 10 12 10 12C10 12 9.5 9.5 9.5 7C9.5 4.5 10 2 10 2Z" fill="#FBBF24"/>
                <path d="M10 18C10 18 9.5 15.5 9.5 13C9.5 10.5 10 8 10 8C10 8 10.5 10.5 10.5 13C10.5 15.5 10 18 10 18Z" fill="#FBBF24"/>
                <path d="M2 10C2 10 4.5 10.5 7 10.5C9.5 10.5 12 10 12 10C12 10 9.5 9.5 7 9.5C4.5 9.5 2 10 2 10Z" fill="#FBBF24"/>
                <path d="M18 10C18 10 15.5 9.5 13 9.5C10.5 9.5 8 10 8 10C8 10 10.5 10.5 13 10.5C15.5 10.5 18 10 18 10Z" fill="#FBBF24"/>
                <path d="M4.22266 4.22266C4.22266 4.22266 5.94531 5.94531 7.50001 7.50001C9.05471 9.05471 10.7773 10.7773 10.7773 10.7773C10.7773 10.7773 9.05471 9.05471 7.50001 7.50001C5.94531 5.94531 4.22266 4.22266 4.22266 4.22266Z" fill="#FBBF24"/>
                <path d="M15.7773 15.7773C15.7773 15.7773 14.0547 14.0547 12.5 12.5C10.9453 10.9453 9.22266 9.22266 9.22266 9.22266C9.22266 9.22266 10.9453 10.9453 12.5 12.5C14.0547 14.0547 15.7773 15.7773 15.7773 15.7773Z" fill="#FBBF24"/>
                <path d="M4.22266 15.7773C4.22266 15.7773 5.94531 14.0547 7.50001 12.5C9.05471 10.9453 10.7773 9.22266 10.7773 9.22266C10.7773 9.22266 9.05471 10.9453 7.50001 12.5C5.94531 14.0547 4.22266 15.7773 4.22266 15.7773Z" fill="#FBBF24"/>
                <path d="M15.7773 4.22266C15.7773 4.22266 14.0547 5.94531 12.5 7.50001C10.9453 9.05471 9.22266 10.7773 9.22266 10.7773C9.22266 10.7773 10.9453 9.05471 12.5 7.50001C14.0547 5.94531 15.7773 4.22266 15.7773 4.22266Z" fill="#FBBF24"/>
                <circle cx="10" cy="10" r="3.5" fill="#FBBF24"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0010.586 10.586z" fill="#6B7280"/>
              </svg>
            )}
          </button>
          
          <div className="nv-user-menu">
            <button 
              className="nv-user-button" 
              onClick={toggleUserMenu}
              aria-label="User menu"
              aria-expanded={isUserMenuOpen}
            >
              <div className="nv-avatar">JD</div>
              <span className="nv-username">John Doe</span>
              <svg className={`nv-chevron ${isUserMenuOpen ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="nv-user-dropdown">
                <div className="nv-user-info">
                  <div className="nv-user-name">John Doe</div>
                  <div className="nv-user-email">john.doe@example.com</div>
                </div>
                <div className="nv-dropdown-divider"></div>
                <a href="#" className="nv-dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 14C2 11.7909 3.79086 10 6 10H10C12.2091 10 14 11.7909 14 14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Profile</span>
                </a>
                <a href="#" className="nv-dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2C8.26522 2 8.51957 2.10536 8.70711 2.29289C8.89464 2.48043 9 2.73478 9 3V13.5858L10.2929 12.2929C10.4804 12.1054 10.7348 12 11 12C11.2652 12 11.5196 12.1054 11.7071 12.2929C11.8946 12.4804 12 12.7348 12 13C12 13.2652 11.8946 13.5196 11.7071 13.7071L9.70711 15.7071C9.51957 15.8946 9.26522 16 9 16C8.73478 16 8.48043 15.8946 8.29289 15.7071L6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929L9 13.5858V3C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H8Z" fill="#6B7280"/>
                  </svg>
                  <span>Settings</span>
                </a>
                <a href="#" className="nv-dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7 3.5H5.5C4.67157 3.5 4 4.17157 4 5V11C4 11.8284 4.67157 12.5 5.5 12.5H7" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 10L13.5 6.5L10 3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.5 6.5H8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarNew;