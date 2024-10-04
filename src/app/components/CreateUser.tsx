import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

const Toastify = (message: string, stype: 'success' | 'error') => {
  return toast(message, {
    position: 'top-center',
    autoClose: 1000,
    pauseOnHover: false,
    type: stype,
    transition: Flip,
    pauseOnFocusLoss: false,
    // hideProgressBar: true,
    draggable: true,
    closeOnClick: true,
  });
};

const CreateUser = ({
  createForm,
  setCreateForm,
}: {
  createForm: boolean;
  setCreateForm: (value: boolean) => void;
}) => {
  const [userData, setUserData] = useState({
    abn: '',
    email: '',
    mobile: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((res) =>
        res.status !== 'success'
          ? Toastify('Cannot create new user', 'error')
          : Toastify('Email Sent to User', 'success')
      );
    setTimeout(() => setCreateForm(false), 2000);
    setIsLoading(false);
  };

  return (
    <div className="p-8 absolute top-0 left-0 z-10 bg-[rgba(255,255,255,0.8)] flex justify-center items-center h-screen w-full">
      <ToastContainer />
      <button
        onClick={() => setCreateForm(false)}
        className="absolute z-10 top-10 right-10 text-black"
      >
        <IoCloseOutline size={30} />
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex max-w-xl w-full flex-col gap-8 bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-2xl text-center border-b-[1px] pb-2 border-gray-400 transition-all">
          Create New User
        </h1>
        <div className="flex flex-col gap-1">
          <h1>Email</h1>
          <input
            type="text"
            placeholder="Enter Email Id"
            className="py-2 outline-none bg-transparent placeholder:text-gray-400 border-b-[1px] border-gray-300 focus:border-gray-700 transition-all"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1>Mobile</h1>
          <input
            type="tel"
            pattern="^04[0-9]{8}$"
            placeholder="Enter user mobile"
            className="py-2 outline-none bg-transparent placeholder:text-gray-400 border-b-[1px] border-gray-300 focus:border-gray-700 transition-all"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, mobile: e.target.value }))
            }
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1>ABN ID</h1>
          <input
            type="text"
            placeholder="Enter ABN No."
            className="py-2 outline-none bg-transparent placeholder:text-gray-400 border-b-[1px] border-gray-300 focus:border-gray-700 transition-all"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, abn: e.target.value }))
            }
            required
          />
        </div>

        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <button
            type="submit"
            className="flex self-center items-center gap-1 px-4 py-2 text-white bg-[#1A1919] w-fit rounded-lg"
          >
            <h1 className="font-medium">Add User</h1>
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateUser;
