'use client';
import React, { useState, useEffect } from 'react';
import Loading from '@/app/components/Loading';
import UserBusinessModal from '@/app/components/UserBusinessModal';
import ContactUs from '@/app/components/ContactUs';
import { useAuth } from '@/providers/authProvider';

import { dataProps, userProps } from '@/types';

const page = ({ params }: { params: { id: string } }) => {
  const businessId = params.id;
  const [data, setData] = useState<userProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authData } = useAuth();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await fetch(`/api/users/${businessId}`, { method: 'GET' })
        .then((res) => res.json())
        .then((res) => {
          setData(res);
        });
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="h-screen relative overflow-hidden">
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        data && <UserBusinessModal data={data} />
      )}
      {authData.userType === 'user' && <ContactUs userId={authData.userId} />}
    </div>
  );
};

export default page;
