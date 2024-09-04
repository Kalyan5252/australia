import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const InfoModal = ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) => {
  return (
    <div className="absolute top-0 left-0  flex justify-center items-center h-screen w-full bg-[rgba(0,0,0,0.8)] transition-all">
      <div className="p-8 rounded-lg flex flex-col gap-8 bg-white text-[#1A1919] max-w-4xl">
        <div className="flex flex-col gap-2">
          <h1>Your UserName is </h1>
          <h1 className="font-bold">{userName}</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Your Password is </h1>
          <h1 className="font-bold">{password}</h1>
          <p className="text-xs">You can change your account password later</p>
        </div>
        <Link
          href="/login"
          className="group flex self-center items-center gap-1 px-4 p-3 text-white bg-[#1A1919] w-fit rounded-lg"
        >
          <h1 className="font-medium">Login</h1>
          <div className="group-hover:translate-x-1 transition-all">
            <FaArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default InfoModal;
