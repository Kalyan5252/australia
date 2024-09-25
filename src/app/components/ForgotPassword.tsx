import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';
import Loading from './Loading';
import { ToastContainer, toast, Flip } from 'react-toastify';

const ForgotPassword = ({
  resetWindow,
  setResetWindow,
}: {
  resetWindow: boolean;
  setResetWindow: (value: boolean) => void;
}) => {
  const [userData, setUserData] = useState({
    email: '',
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSending(true);
      await fetch('/api/sendMail/', {
        method: 'POST',
        body: JSON.stringify({
          to: userData.email,
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
      toast('A Reset mail was sent to your Email', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        type: 'success',
        draggable: true,
        theme: 'light',
        transition: Flip,
      });
      setResetWindow(false);
    } catch (error) {
      toast('❌ Error Occured..Cannot send an Email', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        type: 'error',
        pauseOnHover: false,
        draggable: true,
        theme: 'light',
        transition: Flip,
      });
      console.log(error);
    }
    setIsSending(false);
  };
  return (
    <div className="absolute z-10 h-screen flex justify-center items-center">
      <form
        className="bg-white flex flex-col gap-4 shadow-xl rounded-lg p-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex justify-between gap-16 items-start">
          <h1 className="text-2xl font-medium mb-4">Forgot Password</h1>
          <button onClick={() => setResetWindow(false)} className="text-black">
            <IoCloseOutline size={30} />
          </button>
        </div>
        <h4 className="text-lg font-medium">Enter your mail</h4>
        <input
          type="email"
          placeholder="Email Address"
          className="p-2 outline-none focus:border-gray-800 bg-transparent text-gray-800 border-b-[1px] border-gray-700 transition-all"
          onChange={(e) => setUserData({ email: e.target.value })}
          required
        />

        {isSending ? (
          <Loading />
        ) : (
          <button
            //   disabled={userData.email === ''}
            type="submit"
            className=" group flex items-center gap-1 px-4 py-2 self-center bg-black text-white w-fit rounded-lg"
          >
            <h1 className="font-medium">Send Reset Mail</h1>
            <div className="group-hover:translate-x-1 transition-all">
              <FaArrowRight />
            </div>
          </button>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
