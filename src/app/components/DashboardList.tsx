'use client';
import React, { useState, useEffect } from 'react';
import BusinessCard from './BusinessCard';

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

const DashboardList = () => {
  const [data, setData] = useState<userProps[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/users', { method: 'GET' });
      if (res.ok) {
        const response = await res.json();
        setData(response);
      }
    };
    getData();
  }, []);
  return (
    <div className="mt-8 h-full overflow-y-scroll">
      {data.map((item, index) => (
        <BusinessCard
          key={item._id}
          id={item._id}
          business={item.data.businessName}
          company={item.data.companyName}
        />
      ))}
    </div>
  );
};

export default DashboardList;
