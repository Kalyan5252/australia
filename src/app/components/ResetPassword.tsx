import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useAuth } from '@/providers/authProvider';
import Loading from './Loading';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const ResetPassword = ({
  id,
  resetModal,
  setResetModal,
}: {
  id: string;
  resetModal: boolean;
  setResetModal: (id: boolean) => void;
}) => {
  const [userData, setUserData] = useState({
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await fetch(`/api/users/updatePassword/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...userData }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === 'success') {
            setTimeout(() => window.location.reload(), 1500);
            return Toastify('Password Updated Successfully', 'success');
          } else return Toastify('Cannot Update.. Try again later', 'error');
        });
    } catch (err) {
      console.error(err);
      //   if(err?.message)
      return Toastify('Cannot Update.. Try again later', 'error');
    }
    setIsLoading(false);
    // window.location.reload();
  };

  const { authData } = useAuth();
  console.log(authData);

  return (
    <div className="p-8 absolute top-0 left-0 z-10 bg-[rgba(255,255,255,0.8)] flex justify-center items-center h-screen w-full">
      <button
        onClick={() => setResetModal(false)}
        className="absolute z-10 top-10 right-10 text-black"
      >
        <IoCloseOutline size={30} />
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-8 bg-white shadow-lg rounded-lg p-8"
      >
        <h1 className="text-2xl">Password Update</h1>
        <div className="flex flex-col gap-1">
          {/* <h1>Provide New Password</h1> */}
          <input
            type="text"
            placeholder="Enter New Password"
            className="p-2 outline-none bg-transparent placeholder:text-gray-400 border-b-[1px] border-gray-300 focus:border-gray-700 transition-all"
            onChange={(e) => setUserData({ password: e.target.value })}
            required
          />
        </div>

        {!isLoading ? (
          <button
            type="submit"
            className="flex self-center items-center gap-1 px-4 py-2 text-white bg-[#1A1919] w-fit rounded-lg"
          >
            <h1 className="font-medium">Update</h1>
          </button>
        ) : (
          <Loading />
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
