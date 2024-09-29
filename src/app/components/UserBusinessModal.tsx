import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegUser } from 'react-icons/fa6';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoGlobeOutline } from 'react-icons/io5';
import UpdateForm from './UpdateForm';
import ResetPassword from './ResetPassword';
import { CiLocationOn } from 'react-icons/ci';

import { userProps } from '@/types';
import { redirect } from 'next/navigation';

// import { transporter, mailOptions } from '@/app/config/nodemailer';

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

  useEffect(() => {
    const verify = async () => {
      const res = await fetch('/api/auth/', {
        method: 'GET',
      });
      if (!res.ok) {
        window.location.assign('/login');
      }
    };
    const timer = setTimeout(() => {
      verify();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
      // const response = await res.json();
      const response = await res.json();
      if (response) {
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
        // redirect('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleMail = async () => {
  //   console.log('handling Mail service');
  //   await fetch('/api/sendMail/', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       to: 'kalyanpendem007@gmail.com',
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => console.log(res));
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex flex-col gap-12">
      {updateForm && (
        <UpdateForm
          id={data._id}
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          userData={data}
        />
      )}
      {/* {resetModal && (
        <ResetPassword
          id={data._id}
          resetModal={resetModal}
          setResetModal={setResetModal}
        />
      )} */}
      <div className="lg:hidden flex justify-end gap-4">
        <button
          onClick={() => setUpdateForm(true)}
          className="px-3 py-2 font-medium text-white rounded-lg bg-[#1A1919]"
        >
          Update Data
        </button>
        {/* <button
          onClick={() => handleMail()}
          // onClick={() => setResetModal(true)}
          className="px-3 py-2 font-medium bg-white rounded-lg text-[#1A1919]"
        >
          Reset Password
        </button> */}
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
        <div className="flex items-center gap-4">
          {data.data.businessLogo !== '' && data.data.businessLogo && (
            <Image
              src={`https://pub-4dba511debbc404da50bb5d141f735bc.r2.dev/business-aus/${data.data.businessLogo}`}
              alt="business Logo"
              height={100}
              width={100}
              className="max-w-[100px] max-h-[100px] min-h-[100px] min-w-[100px] rounded-full"
            />
          )}
          <h1 className="text-6xl font-medium capitalize">
            {data.data.companyName}
          </h1>
        </div>
        <div className="hidden lg:flex gap-4">
          <button
            onClick={() => setUpdateForm(true)}
            className="px-3 py-2 font-medium text-white rounded-lg bg-[#1A1919]"
          >
            Update Data
          </button>
          {/* <button
            onClick={() => setResetModal(true)}
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
      <div className="flex flex-col gap-4 text-gray-700">
        <h2 className="text-3xl font-medium text-gray-800">
          {data.data.businessName}
        </h2>
        <p className="max-w-[100ch] ">{data.data.businessDescription}</p>
      </div>
      <div className="flex flex-col gap-4 text-gray-700">
        <h2 className="text-3xl font-medium text-gray-800">
          Contact Information
        </h2>
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
          <p>{data.email}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="p-2 rounded-full border-[1px] border-gray-200">
            <IoGlobeOutline />
          </div>
          <p>{data.data.companyWebsite}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="p-2 rounded-full border-[1px] border-gray-200">
            <CiLocationOn />
          </div>
          <div className="flex flex-col gap-1">
            <p>{data.data?.address}</p>
            <p>
              {data.data?.city} {data.data?.city && ','} {data.data?.state}{' '}
              {data.data?.state && ','} {data.data?.zipcode}
            </p>
            {/* <p></p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBusinessModal;
