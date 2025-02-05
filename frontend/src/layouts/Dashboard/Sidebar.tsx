import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'; // Import default styles
import style from './index.module.css';

// Simplified sidebar items (no roles, just labels and paths)
const sidebarItems = [
  { label: "Profile", path: "/dashboard/profile" },
  { label: "Settings", path: "/dashboard/settings" },
  
];

const Sidebar: React.FC = () => {

  return (
    <Drawer open={true} direction="left" style={{ width: '250px' }}>
      
    </Drawer>
  );
};

export default Sidebar;

