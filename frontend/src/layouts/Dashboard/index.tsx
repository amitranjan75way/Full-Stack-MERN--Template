
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

