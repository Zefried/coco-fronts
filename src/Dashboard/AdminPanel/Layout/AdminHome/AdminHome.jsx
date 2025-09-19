import React, { useEffect, useState } from 'react';
import SidebarNew from '../Sidebar/Sidebar';
import NavbarNew from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { DarkModeProvider } from '../Darkmood/Darkmood';

const AdminHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if click is outside sidebar
      if (!event.target.closest('.sidebar-new') && !event.target.closest('.navbar-toggle')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DarkModeProvider>
      {/* Pass toggle button a class so it's excluded from auto-close */}
      <NavbarNew toggleSidebar={toggleSidebar} toggleBtnClass="navbar-toggle" />
      
      {/* Add a root className "sidebar" so clicks inside are detected */}
      <div className="sidebar-new">
        <SidebarNew isOpen={isSidebarOpen} />
      </div>

      <div style={{ marginLeft: isSidebarOpen ? '200px' : '0' }}>
        <Outlet/>
      </div>
    </DarkModeProvider>
  );
};

export default AdminHome;
