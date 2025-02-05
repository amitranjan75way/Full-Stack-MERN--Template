import React from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import { motion } from 'framer-motion';
import 'react-modern-drawer/dist/index.css';
import style from './index.module.css';

// Sidebar items
const sidebarItems = [
  { label: "Profile", path: "/dashboard/profile" },
  { label: "Settings", path: "/dashboard/settings" },
];

// Animation Variants
const sidebarVariants = {
  hidden: { x: -250, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: index * 0.1, duration: 0.3 },
  }),
};

const Sidebar: React.FC = () => {
  return (
    <Drawer open={true} direction="left" className={style.drawer} enableOverlay={false}>
      <motion.nav 
        className={style.sidebar} 
        initial="hidden" 
        animate="visible" 
        variants={sidebarVariants}
      >
        <ul className={style.navList}>
          {sidebarItems.map((item, index) => (
            <motion.li 
              key={item.path} 
              className={style.navItem} 
              variants={itemVariants} 
              custom={index}
              initial="hidden" 
              animate="visible"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? `${style.navLink} ${style.activeNavLink}` : style.navLink
                }
              >
                {item.label}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </Drawer>
  );
};

export default Sidebar;
