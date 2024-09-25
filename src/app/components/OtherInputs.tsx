'use client';
import React, { useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa6';

interface otherInputProps {
  label: string;
  placeholder: string;
  type: string;
  onchange: (key: string, value: string | File | undefined) => void;
  value?: string | File | undefined;
  //   bodyKey: string;
  // type: 'textarea' | 'file';
}

const OtherInputs = ({
  label,
  placeholder,
  type,
  onchange,
  value,
}: //   bodyKey,
otherInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined | null>(
    null
  );

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div
      className={`flex flex-col gap-4 ${
        type === 'textArea' && 'col-span-full'
      }`}
    >
      <label className="text-gray-800 text-xl">{label}</label>
      {type !== 'file' ? (
        <textarea
          cols={30}
          rows={5}
          onChange={(e) => onchange(label, e.target.value)}
          placeholder={placeholder}
          value={typeof value === 'string' ? value : ''}
          className="border-[1px] rounded-lg resize-none border-gray-800 p-2 outline-none"
        ></textarea>
      ) : (
        <div className="flex bg-transparent border-dashed border-[1px] border-gray-800 p-2 rounded-lg bg-[#1A1919] items-center outline-none text-gradient1">
          <label className=" text-gray-800 outline-none w-full">
            {selectedFile
              ? selectedFile.name
              : typeof value === 'string'
              ? value
              : placeholder}
          </label>
          <button type="button" onClick={handleButtonClick}>
            <FaUpload size={22} className="text-gray-800" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={(e) => {
              setSelectedFile(e.target.files?.[0]);
              onchange(label, e.target.files?.[0]);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OtherInputs;
