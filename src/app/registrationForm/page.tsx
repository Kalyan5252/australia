import React from 'react';
import Form from '../components/Form';

const page = () => {
  return (
    <div className="p-8 lg:p-16 h-screen md:max-h-screen relative">
      <div className="gradient1 hidden lg:block"></div>
      <div className="gradient2 hidden lg:block"></div>
      <h1 className="text-4xl font-bold">Bussiness Registration Form</h1>
      <Form />
    </div>
  );
};

export default page;
