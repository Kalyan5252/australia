'use client';
import React, { useState, useEffect } from 'react';
import Loading from '@/app/components/Loading';
import UserBusinessModal from '@/app/components/UserBusinessModal';

import { dataProps, userProps } from '@/types';

const page = ({ params }: { params: { id: string } }) => {
  const businessId = params.id;
  const [data, setData] = useState<userProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="p-8 lg:p-16 h-screen">
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        data && <UserBusinessModal data={data} />
      )}
    </div>
  );
};

export default page;
