import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegUser } from 'react-icons/fa6';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoGlobeOutline } from 'react-icons/io5';
import UpdateForm from './UpdateForm';
import ResetPassword from './ResetPassword';
import UpdateAbn from './UpdateAbn';
import { CiLocationOn } from 'react-icons/ci';
import { TiBusinessCard } from 'react-icons/ti';
import DropDown from './DropDown';
import { useAuth } from '@/providers/authProvider';
import useVerifyUser from '../hooks/VerifyUser';

import { userProps } from '@/types';
import { redirect } from 'next/navigation';

// import { transporter, mailOptions } from '@/app/config/nodemailer';

interface BusinessModalProps {
  data: userProps;
}

const UserBusinessModal: React.FC<BusinessModalProps> = ({ data }) => {
  const [updateForm, setUpdateForm] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  // const [abnModal, setAbnModal] = useState(false);
  const { authData, setAuthData } = useAuth();
  const { verifyRole } = useVerifyUser();

  useEffect(() => {
    verifyRole();
  }, []);

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
    <div className="">
      {updateForm && (
        <UpdateForm
          id={data._id}
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          userData={data}
        />
      )}
      {resetModal && (
        <ResetPassword
          id={authData.userId}
          resetModal={resetModal}
          setResetModal={setResetModal}
        />
      )}
      {/* {abnModal && (
        <UpdateAbn
          id={data._id}
          abnModal={abnModal}
          setAbnModal={setAbnModal}
        />
      )} */}
      <div
        className={`${
          resetModal || updateForm
            ? 'blur-sm overflow-y-hidden'
            : 'blur-0 overflow-y-scroll'
        }`}
      >
        <div
          className={`bg-black text-white lg:px-16 py-4 px-8 flex justify-between items-center `}
        >
          <div className="flex items-center gap-4">
            {data?.data?.businessLogo !== '' && data?.data?.businessLogo && (
              <Image
                src={data.data.businessLogo}
                alt="business Logo"
                height={50}
                width={50}
                className="max-w-[70px] max-h-[70px] min-h-[70px] min-w-[70px] rounded-full"
              />
            )}
            <h1 className="text-2xl font-medium capitalize">
              {data.data?.businessName}
            </h1>
          </div>
          <DropDown
            updateForm={updateForm}
            setUpdateForm={setUpdateForm}
            resetModal={resetModal}
            setResetModal={setResetModal}
          />
        </div>
        <div className="p-8 lg:p-16 flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 text-gray-700 font-medium">
              <div className="p-2 rounded-full border-[1px] border-gray-200">
                <TiBusinessCard size={30} />
              </div>
              <p className="max-w-[100ch] text-xl">
                <span className="font-normal">{data.data?.abn}</span>
              </p>
            </div>
            <div className="flex flex-col gap-4 text-gray-700">
              <p className="max-w-[100ch] ">{data.data?.businessDescription}</p>
            </div>
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
                {data.data?.firstName} {data.data?.lastName}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="p-2 rounded-full border-[1px] border-gray-200">
                <BsTelephone />
              </div>
              <p>{data.data?.mobile}</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="p-2 rounded-full border-[1px] border-gray-200">
                <MdOutlineMailOutline />
              </div>
              <p>{data?.email}</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="p-2 rounded-full border-[1px] border-gray-200">
                <IoGlobeOutline />
              </div>
              <p>{data.data?.companyWebsite}</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="p-2 rounded-full border-[1px] border-gray-200">
                <CiLocationOn />
              </div>
              <div className="flex flex-col gap-1">
                <p>{data.data?.address}</p>
                <p>
                  {data.data?.city} {data.data?.city && ','} {data.data?.state}{' '}
                  {data.data?.state && ','} {data.data?.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBusinessModal;
