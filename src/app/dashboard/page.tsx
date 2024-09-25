'use client';
import React, { useEffect, useState } from 'react';
import DashboardList from '../components/DashboardList';
import DashboardGrid from '../components/DashboardGrid';
import ResetPassword from '../components/ResetPassword';

const page = () => {
  const [resetModal, setResetModal] = useState(false);
  const [adminId, setAdminId] = useState('');
  useEffect(() => {
    const verify = async () => {
      const res = await fetch('/api/auth/', {
        method: 'GET',
      });
      if (!res.ok) {
        window.location.assign('/login');
      }
      if (res.ok) {
        const response = await res.json();
        setAdminId(response.id);
        if (response.role !== 'admin') {
          window.location.assign(`/userBusiness/${response.id}`);
        }
      }
    };
    verify();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'GET' });
      // const response = await res.json();
      const response = await res.json();
      if (response) {
        setTimeout(() => {
          window.location.assign('/login');
          // console.log('logging out');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative p-8 max-h-screen">
      {resetModal && (
        <ResetPassword
          id={adminId}
          resetModal={resetModal}
          setResetModal={setResetModal}
        />
      )}
      <div className="lg:hidden mb-4 flex gap-2">
        {/* <button
          onClick={() => {
            setResetModal(true);
          }}
          className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
        >
          Reset Password
        </button> */}
        {/* <button
          onClick={() => {
            handleLogout();
          }}
          className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
        >
          Logout
        </button> */}
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Registered Business</h1>
        <div className="hidden lg:flex gap-2">
          {/* <button
            onClick={() => {
              setResetModal(true);
            }}
            className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
          >
            Reset Password
          </button> */}
          {/* <button
            onClick={() => {
              handleLogout();
            }}
            className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
          >
            Logout
          </button> */}
        </div>
      </div>
      <DashboardGrid />
    </div>
  );
};

export default page;
