'use client';
import React, { useState, useEffect, useContext } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Loading from '../components/Loading';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ForgotPassword from '../components/ForgotPassword';
import { useAuth } from '@/providers/authProvider';
import axios from 'axios';

const Toastify = (message: string, stype: 'success' | 'error') => {
  return toast(message, {
    position: 'top-center',
    autoClose: 1000,
    pauseOnHover: false,
    type: stype,
    transition: Flip,
    pauseOnFocusLoss: false,
    draggable: true,
    closeOnClick: true,
  });
};

const page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({ userName: '', password: '' });
  const [resetWindow, setResetWindow] = useState(false);
  const { authData, setAuthData } = useAuth();

  useEffect(() => {
    const verify = async () => {
      const res = await fetch('/api/auth/', {
        method: 'GET',
      });
      if (res.ok && res.status !== 401) {
        // console.log(res.headers);
        const response = await res.json();
        setAuthData({
          userType: response.role === 'admin' ? 'admin' : 'user',
          isAuthenticated: true,
          userId: response.id,
        });

        response.role === 'admin'
          ? router.push('/dashboard')
          : router.push(`/userBusiness/${response.id}`);
      }
    };
    const timer = setTimeout(() => {
      verify();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    try {
      console.log('userData:', userData);
      await axios.post('/api/auth/', userData).then((res) => {
        console.log('res:', res);
        if (res.data?.status === 'success') {
          Toastify('Login Successful', 'success');
          // console.log(response);
          setAuthData({
            userType: res.data?.role === 'admin' ? 'admin' : 'user',
            isAuthenticated: true,
            userId: res.data?.id,
          });
          res.data?.role === 'admin'
            ? router.push('/dashboard')
            : res.data?.isRegistered
            ? router.push(`/userBusiness/${res.data?.id}`)
            : router.push(`/users/registrationForm/${res.data?.id}`);
        } else {
          return Toastify('Authentication Failed', 'error');
        }
      });
    } catch (error) {
      return Toastify('❌ Error Occured..', 'error');
    }
  };

  return (
    <div
      className={`h-screen relative flex justify-center items-center ${resetWindow}`}
    >
      <ToastContainer />
      {resetWindow && (
        <ForgotPassword
          setResetWindow={setResetWindow}
          resetWindow={resetWindow}
        />
      )}
      {/* <div className="gradient1 hidden lg:block"></div>
      <div className="gradient2 hidden lg:block"></div> */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={`flex flex-col gap-8 ${resetWindow && 'blur-lg'}`}
      >
        <h1 className="font-bold text-2xl self-center border-b-[1px] border-gray-800">
          Login
        </h1>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">UserName</h1>
          <input
            type="text"
            placeholder="Enter your UserName"
            className="py-2 text-xl outline-none focus:border-gray-800 bg-transparent text-gray-800 border-b-[1px] border-gray-300 transition-all"
            onChange={(e) => {
              setUserData((prev) => ({
                ...prev,
                userName: e.target.value,
              }));
            }}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">Password</h1>
          <input
            type="password"
            placeholder="Enter your password"
            className="py-2 text-xl outline-none focus:border-gray-800 bg-transparent text-gray-800 border-b-[1px] border-gray-300 transition-all"
            onChange={(e) => {
              setUserData((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            required
          />
          <p className="font-light gap-10 text-gray-700 flex justify-between">
            <button
              type="button"
              onClick={() => setResetWindow(true)}
              className="underline"
            >
              Forgot Password?
            </button>
          </p>
        </div>

        <button
          type="submit"
          className=" group flex items-center gap-1 px-4 py-2 self-center bg-black text-white w-fit rounded-lg"
        >
          <h1 className="font-medium">Login</h1>
          <div className="group-hover:translate-x-1 transition-all">
            <FaArrowRight />
          </div>
        </button>
      </form>
    </div>
  );
};

export default page;
