import React from 'react';
import { logout } from '../../store/reducers/authReducer'; 
import style from './index.module.css';
import { useAppDispatch, useAppSelector } from '../../store/store';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { name, email, role } = useAppSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    // Handle any other logic for logging out (redirect, etc.)
  };

  const profilePic = `https://ui-avatars.com/api/${name}?background=random`;

  return (
    <div className={style.profilePage}>
      <div className={style.profileCard}>
        <div className={style.profilePicContainer}>
          <img src={profilePic} alt="Profile" className={style.profilePic} />
        </div>
        <div className={style.profileInfoContainer}>
          <h2>{name}</h2>
          <p>{email}</p>
          <p className={style.roleText}>{role}</p>
        </div>
        <div className={style.profileActionsContainer}>
          <button onClick={() => { window.location.href = '/update-password'; }} className={style.changePasswordButton}>
            Change Password
          </button>
          <button onClick={handleLogout} className={style.logoutButton}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
