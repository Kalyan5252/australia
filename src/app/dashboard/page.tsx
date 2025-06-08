'use client';
import React, { useEffect, useState } from 'react';
import DashboardGrid from '../components/DashboardGrid';
import ResetPassword from '../components/ResetPassword';
import DropDownAdmin from '../components/DropDownAdmin';
import CreateUser from '../components/CreateUser';
import { useAuth } from '@/providers/authProvider';
import useVerifyUser from '../hooks/VerifyUser';
import { cn } from '@/lib/utils';
import dmSerif from '@/fonts/dmSerif';

const page = () => {
  const [resetModal, setResetModal] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [adminId, setAdminId] = useState('');
  const { verifyUser } = useVerifyUser();
  const { authData, setAuthData } = useAuth();

  useEffect(() => {
    verifyUser();
  }, []);
  // useEffect(() => console.log('context check:', authData), [authData]);

  return (
    <div className={`relative max-h-screen z-0 `}>
      {resetModal && (
        <ResetPassword
          id={authData.userId}
          resetModal={resetModal}
          setResetModal={setResetModal}
        />
      )}
      {createForm && (
        <CreateUser createForm={createForm} setCreateForm={setCreateForm} />
      )}
      <div
        className={`${
          resetModal || createForm ? 'blur-sm pointer-events-none' : ''
        }`}
      >
        <div className="flex justify-between w-full items-center text-white bg-black px-8 py-4">
          <h1 className={cn(dmSerif.className, 'text-4xl font-bold')}>
            Registered Business
          </h1>
          <DropDownAdmin
            resetModal={resetModal}
            setResetModal={setResetModal}
            createForm={createForm}
            setCreateForm={setCreateForm}
          />
        </div>
        <div className="p-8">
          <DashboardGrid />
        </div>
      </div>
    </div>
  );
};

export default page;
