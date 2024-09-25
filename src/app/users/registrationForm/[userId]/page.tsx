'use client';
import React, { useState, useEffect } from 'react';
import UserForm from '@/app/components/userForm';
import { userProps } from '@/types';
import Loading from '@/app/components/Loading';

const page = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  const [userData, setUserData] = useState<userProps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      await fetch(`/api/users/${userId}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUserData(res);
        });
      setIsLoading(false);
    };
    getUserData();
  }, []);
  return (
    <div className="p-8 lg:p-16 h-screen md:max-h-screen flex flex-col gap-4 relative">
      {!isLoading ? (
        <>
          <div className="flex justify-between w-full">
            <h1 className="text-4xl font-bold">Bussiness Registration Form</h1>
            <div className="flex flex-col gap-1">
              <h2 className="hidden lg:block font-medium">
                {userData?.userName}
              </h2>
              <h2 className="hidden lg:block italic text-sm">
                {userData?.email}
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="lg:hidden block font-medium">
              {userData?.userName}
            </h2>
            <h2 className="lg:hidden block italic text-sm">
              {userData?.email}
            </h2>
          </div>
          <UserForm id={userId} />
        </>
      ) : (
        <div className="h-screen flex justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default page;
