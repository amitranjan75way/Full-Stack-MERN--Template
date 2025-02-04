import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './index';

const Layout: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Content on the right */}
      <div style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
        {/* Render the active route content here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
