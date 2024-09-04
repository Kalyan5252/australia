'use client';
import React from 'react';
import DashboardList from '../components/DashboardList';

const page = () => {
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'GET' });
      // const response = await res.json();
      window.location.assign('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-16 max-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Registered Business</h1>
        <button
          onClick={() => {
            handleLogout();
          }}
          className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
        >
          Logout
        </button>
      </div>
      <DashboardList />
    </div>
  );
};

export default page;
