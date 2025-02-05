import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import style from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/reducers/authReducer';
import { useLogoutUserMutation } from '../../services/userApi';
import { ThemeContext } from '../../context/ThemeContext';
import toast from 'react-hot-toast';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  const authData = useAppSelector((store) => store.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authData.isAuthenticated || false);
  }, [authData]);

  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Access theme context
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }
  const { theme, toggleTheme } = themeContext;

  // Profile dropdown state
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser({});
      dispatch(logout());
      navigate('/');
    } catch (error) {
      toast.error("something went wrong...")
      console.log(error);
    }
  };
  const handleDashboard = () => {
    navigate('/dashboard/profile');
    setShowDropdown(false);
  }
  const handleSetting = () => {
    navigate('/setting');
    setShowDropdown(false);
  }

  return (
    <motion.header 
      className={style.header}
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      {/* Logo Section */}
      <motion.div 
        className={style.logo} 
        onClick={() => navigate('/')}
        initial={{ x: -50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1>My App</h1>
      </motion.div>

      {/* Right Side: Theme Toggle & Profile/Auth */}
      <div className={style.actions}>
        {/* Theme Toggle Button */}
        <motion.button 
          onClick={toggleTheme} 
          className={style.themeToggle}
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {theme === 'light' ? <MdDarkMode /> : <MdLightMode style={{color: 'white'}} />}
        </motion.button>

        {/* Conditional Rendering for Authenticated Users */}
        {isAuthenticated ? (
          <motion.div 
            className={style.profileWrapper}
            initial={{ x: 50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div 
              className={style.profileIcon} 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>A</span>
            </div>

            {showDropdown && (
              <motion.div 
                className={style.dropdownMenu}
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3 }}
              >
                <button onClick={handleDashboard}>Dashboard</button>
                <button onClick={handleSetting}>Settings</button>
                <button onClick={handleLogout}>Logout</button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            className={style.authButtons}
            initial={{ x: 50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Signup</button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
