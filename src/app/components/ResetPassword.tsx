import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

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

  const handleSubmit = async () => {
    try {
      await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...userData }),
      })
        .then((res) => res.json())
        .then((res) => {});
    } catch (err) {
      console.error(err);
      //   if(err?.message)
    }
    window.location.reload();
  };
  return (
    <div className="p-8 absolute top-0 left-0 bg-[rgba(0,0,0,1)] flex justify-center items-center h-screen w-full">
      <button
        onClick={() => setResetModal(false)}
        className="absolute z-10 top-10 right-10 text-white"
      >
        <IoCloseOutline size={30} />
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-8"
      >
        <h1 className="text-2xl">Password Reset</h1>
        <div className="flex flex-col gap-1">
          {/* <h1>Provide New Password</h1> */}
          <input
            type="text"
            placeholder="Enter New Password"
            className="p-2 outline-none focus:border-gray-100 bg-transparent text-gray-400 border-b-[1px] border-gray-300 focus:shadow-lg transition-all"
            onChange={(e) => setUserData({ password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="flex self-center items-center gap-1 px-4 py-2 bg-white text-[#1A1919] w-fit rounded-lg"
        >
          <h1 className="font-medium">Update</h1>
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
