'use client';
import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';

const Toastify = (message: string, stype: 'success' | 'error') => {
  return toast(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    type: stype,
    draggable: true,
    theme: 'light',
    transition: Flip,
  });
};

const page = () => {
  const [userData, setUserData] = useState({
    email: '',
    userName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const handeRegister = async () => {
    // console.log(userData);
    setIsLoading(true);
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.status !== 'success') {
          Toastify(res.message, 'error');
          setTimeout(() => setUserData({ email: '', userName: '' }), 2000);
        }
        if (res.status === 'success') {
          Toastify('Registration Mail sent to your Mail', 'success');
        }
      })
      .catch(() => {
        Toastify('Error!! Try Again Later', 'error');
      });
    setIsLoading(false);
    // Toastify('success', 'success');
  };
  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);
  return (
    <div className="h-screen flex justify-center items-center ">
      <ToastContainer />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handeRegister();
        }}
        className="max-w-sm w-full p-8 rounded-lg flex items-center flex-col gap-4"
      >
        <h1 className="font-medium pb-2 border-b-[1px] border-black text-2xl text-center">
          Register
        </h1>
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-xl">UserName</h1>
          <input
            type="text"
            placeholder="Enter your UserName"
            className="py-2 text-xl outline-none focus:border-gray-800 bg-transparent text-gray-800 border-b-[1px] border-gray-300 transition-all"
            value={userData.userName}
            onChange={(e) => {
              setUserData((prev) => ({
                ...prev,
                userName: e.target.value,
              }));
            }}
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-xl">Email</h1>
          <input
            type="email"
            placeholder="Enter your mail Id"
            className="py-2 w-full text-xl outline-none focus:border-gray-800 bg-transparent text-gray-800 border-b-[1px] border-gray-300 transition-all"
            value={userData.email}
            onChange={(e) => {
              setUserData((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            required
          />
        </div>
        {!isLoading ? (
          <button
            type="submit"
            className=" group flex items-center gap-1 px-4 py-2 self-center bg-black text-white w-fit rounded-lg"
          >
            <h1 className="font-medium">Register</h1>
            <div className="group-hover:translate-x-1 transition-all">
              <FaArrowRight />
            </div>
          </button>
        ) : (
          <div className="mt-4">
            <Loading />
          </div>
        )}
      </form>
    </div>
  );
};

export default page;
