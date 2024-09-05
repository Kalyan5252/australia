import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa6';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoGlobeOutline } from 'react-icons/io5';
import UpdateForm from './UpdateForm';
import ResetPassword from './ResetPassword';

import { userProps } from '@/types';

interface BusinessModalProps {
  data: userProps;
}

const UserBusinessModal: React.FC<BusinessModalProps> = ({ data }) => {
  const [updateForm, setUpdateForm] = useState(false);
  const [resetModal, setResetModal] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const res = await fetch('/api/auth/', {
        method: 'GET',
      });
      if (!res.ok) {
        window.location.assign('/login');
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
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      {updateForm && (
        <UpdateForm
          id={data._id}
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
        />
      )}
      {resetModal && (
        <ResetPassword
          id={data._id}
          resetModal={resetModal}
          setResetModal={setResetModal}
        />
      )}
      <div className="lg:hidden flex gap-4">
        <button
          onClick={() => setUpdateForm(true)}
          className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
        >
          Update Data
        </button>
        <button
          onClick={() => setResetModal(true)}
          className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
        >
          Reset Password
        </button>
        <button
          onClick={() => {
            handleLogout();
          }}
          className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
        >
          Logout
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-medium">{data.data.companyName}</h1>
        <div className="hidden lg:flex gap-4">
          <button
            onClick={() => setUpdateForm(true)}
            className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
          >
            Update Data
          </button>
          <button
            onClick={() => setResetModal(true)}
            className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
          >
            Reset Password
          </button>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-gray-200">
        <h2 className="text-3xl font-medium text-white">
          {data.data.businessName}
        </h2>
        <p className="max-w-[100ch] ">{data.data.businessDescription}</p>
      </div>
      <div className="flex flex-col gap-4 text-gray-200">
        <h2 className="text-3xl font-medium text-white">Contact Information</h2>
        <div className="flex gap-4 items-center">
          <div className="p-2 rounded-full border-[1px] border-gray-200">
            <FaRegUser />
          </div>
          <p>
            {data.data.firstName} {data.data.lastName}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="p-2 rounded-full border-[1px] border-gray-200">
            <BsTelephone />
          </div>
          <p>{data.data.mobile}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="p-2 rounded-full border-[1px] border-gray-200">
            <MdOutlineMailOutline />
          </div>
          <p>{data.data.email}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="p-2 rounded-full border-[1px] border-gray-200">
            <IoGlobeOutline />
          </div>
          <p>{data.data.companyWebsite}</p>
        </div>
      </div>
    </div>
  );
};

export default UserBusinessModal;
