import React from 'react';
import style from './index.module.css';
import logo from '../../accets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { logout } from '../../store/reducers/authReducer';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, name } = useAppSelector((store) => store.auth);

  const handleLogout = () => {
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('isAuthenticated');

    dispatch(logout());
    navigate('/');
  };

  return (
    <header className={style.header}>
      <div className={style.logo} onClick={() => navigate('/')}>
        <img src={logo} alt="Food Delivery App Logo" />
        <h1>Food Delivery</h1>
      </div>
      <nav className={style.nav}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div className={style.actions}>
        {isAuthenticated ? (
          <>
            <div className={style.profile} onClick={() => navigate('/profile')}>
              <span className={style.userName}>{name}</span>
              <i className="fas fa-user-circle" style={{ fontSize: '20px', marginLeft: '5px' }}></i>
            </div>
            <button className={style.logout} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className={style.login} onClick={() => navigate('/login')}>Login</button>
            <button className={style.signup} onClick={() => navigate('/register')}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
