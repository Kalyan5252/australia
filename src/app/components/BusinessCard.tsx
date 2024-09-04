import React from 'react';
import { TbArrowUpRight } from 'react-icons/tb';
import Link from 'next/link';

const BusinessCard = ({
  id,
  business,
  company,
}: {
  id: string;
  business: string;
  company: string;
}) => {
  return (
    <Link
      href={`/business/${id}`}
      className="py-4 w-full flex justify-between items-center border-b-[1px] border-gray-400"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{company}</h1>
        <h1 className="text-lg">{business}</h1>
      </div>
      <button className="p-2 rounded-full border-[1px] bg-[#1A1919] border-white">
        <TbArrowUpRight size={25} />
      </button>
    </Link>
  );
};

export default BusinessCard;
