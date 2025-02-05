import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from '../../components/header';
import style from './index.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={style.dashboard}>
      {/* Fixed Header */}
      <Header />

      <div className={style.mainContent}>
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content (NO internal scrollbar) */}
        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
