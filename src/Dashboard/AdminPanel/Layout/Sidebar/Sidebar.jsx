import React, { useState } from 'react';
import './Sidebar.css';

const SidebarNew = ({ isOpen }) => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  
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
            <a href="#" className="sb-menu-item">
              <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H15.5C16.3284 3 17 3.67157 17 4.5V7.5C17 8.32843 16.3284 9 15.5 9H4.5C3.67157 9 3 8.32843 3 7.5V4.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12.5C3 11.6716 3.67157 11 4.5 11H9.5C10.3284 11 11 11.6716 11 12.5V15.5C11 16.3284 10.3284 17 9.5 17H4.5C3.67157 17 3 16.3284 3 15.5V12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 12.5C13 11.6716 13.6716 11 14.5 11H15.5C16.3284 11 17 11.6716 17 12.5V15.5C17 16.3284 16.3284 17 15.5 17H14.5C13.6716 17 13 16.3284 13 15.5V12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Dashboard</span>
            </a>
          </li>
          
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
                <span>Users</span>
                <svg className={`sb-arrow ${isUsersOpen ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <ul className={`sb-submenu ${isUsersOpen ? 'sb-submenu-open' : ''}`}>
                <li>
                  <a href="#" className="sb-submenu-item">
                    <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 14C2 11.7909 3.79086 10 6 10H10C12.2091 10 14 11.7909 14 14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    All Users
                  </a>
                </li>
                <li>
                  <a href="#" className="sb-submenu-item">
                    <svg className="sb-submenu-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1.5V14.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.5 5.5L8 1.5L11.5 5.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add User
                  </a>
                </li>
              </ul>
            </div>
          </li>

        
          
          <li>
            <a href="#" className="sb-menu-item">
              <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4.5C10 3.67157 10.6716 3 11.5 3H15.5C16.3284 3 17 3.67157 17 4.5V15.5C17 16.3284 16.3284 17 15.5 17H11.5C10.6716 17 10 16.3284 10 15.5V4.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H8.5C9.32843 3 10 3.67157 10 4.5V7.5C10 8.32843 9.32843 9 8.5 9H4.5C3.67157 9 3 8.32843 3 7.5V4.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12.5C3 11.6716 3.67157 11 4.5 11H8.5C9.32843 11 10 11.6716 10 12.5V15.5C10 16.3284 9.32843 17 8.5 17H4.5C3.67157 17 3 16.3284 3 15.5V12.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Settings</span>
            </a>
          </li>
          
          <li>
            <a href="#" className="sb-menu-item sb-logout">
              <svg className="sb-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4.5H5.5C4.67157 4.5 4 5.17157 4 6V14C4 14.8284 4.67157 15.5 5.5 15.5H7" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 12.5L13.5 9L10 5.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5 9H8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="sb-sidebar-footer">
        <div className="sb-user-profile">
          <div className="sb-user-avatar">JD</div>
          <div className="sb-user-info">
            <div className="sb-user-name">John Doe</div>
            <div className="sb-user-role">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarNew;