'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = ({ params }: { params: { tokenId: string } }) => {
  const token = params.tokenId;
  const [message, setMessage] = useState<string>('Url is Invalid. ');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState({
    loading: true,
    verified: false,
  });

  const toastify = (stype: 'success' | 'error', message: string) => {
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

  const handlePasswordReset = async () => {
    await fetch('/api/users/resetPassword', {
      method: 'POST',
      body: JSON.stringify({
        token,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === 'success') {
          toastify('success', 'Password Changed Successfully');
          setTimeout(() => {
            window.location.assign('/login');
          }, 2000);
        } else {
          toastify('error', 'Error Occured. Try again');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  };

  useEffect(() => {
    const verify = async () => {
      await fetch('/api/users/verifyHashedToken', {
        method: 'POST',
        body: JSON.stringify({
          token,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message !== 'success') {
            setIsValid((prev) => ({ ...prev, verified: false }));
            setMessage('Url is Invalid. ');
          } else {
            setIsValid((prev) => ({ ...prev, verified: true }));
          }
        });
      setIsValid((prev) => ({ ...prev, loading: false }));
    };
    verify();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <ToastContainer />
      {!isValid.loading && (
        <>
          {isValid.verified ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePasswordReset();
              }}
              className="p-8 flex flex-col gap-4 bg-white shadow-xl rounded-lg border-[1px]"
            >
              <h1 className="font-medium text-center text-2xl pb-2 border-b-[1px] border-black">
                Reset Password
              </h1>
              <div className="flex flex-col gap-2">
                <h3>Enter New Password</h3>
                <input
                  type="password"
                  placeholder="New password"
                  className="p-2 text-lg outline-none focus:border-gray-800 bg-transparent text-gray-800 border-b-[1px] border-gray-300 transition-all"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  minLength={5}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 self-center bg-black text-white w-fit rounded-lg"
              >
                Submit
              </button>
            </form>
          ) : (
            <p> {message}</p>
          )}
        </>
      )}
    </div>
  );
};

export default page;
