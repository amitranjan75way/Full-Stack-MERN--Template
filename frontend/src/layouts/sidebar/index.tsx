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
  const location = useLocation();

  return (
    <Drawer open={true} direction="left" style={{ width: '250px' }}>
      <div className={style.sidebarContainer}>
        <h3 className={style.sidebarHeading}>Dashboard</h3>
        <ul className={style.sidebarList}>
          {sidebarItems.map((item) => (
            <li key={item.label} className={style.sidebarItem}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? `${style.sidebarLink} ${style.activeLink}` : style.sidebarLink
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  );
};

export default Sidebar;
