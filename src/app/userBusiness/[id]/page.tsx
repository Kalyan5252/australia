'use client';
import React, { useState, useEffect } from 'react';
import Loading from '@/app/components/Loading';
import UserBusinessModal from '@/app/components/UserBusinessModal';

interface dataProps {
  businessDescription: string; // MongoDB ObjectId as a string
  businessLogo: string;
  businessName: string;
  companyName: string;
  companyWebsite: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
}

interface userProps {
  data: dataProps;
  _id: string;
  __v: number;
  email: string;
  password: string;
  createdAt: string;
}

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
