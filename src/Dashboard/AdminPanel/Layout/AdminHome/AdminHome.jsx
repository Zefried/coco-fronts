import React, { useState } from 'react';
import SidebarNew from '../Sidebar/Sidebar';
import NavbarNew from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { DarkModeProvider } from '../Darkmood/Darkmood';

const AdminHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  return (
    <DarkModeProvider>
      <NavbarNew toggleSidebar={toggleSidebar} />
      <SidebarNew isOpen={isSidebarOpen} />
      <div style={{ marginLeft: isSidebarOpen ? '200px' : '0' }}>
        <Outlet/>
      </div>
    </DarkModeProvider>
  );

};

export default AdminHome;
