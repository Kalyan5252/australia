'use client';
import React, { useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa6';
import Image from 'next/image';

interface otherInputProps {
  label: string;
  placeholder: string;
  type: string;
  onchange: (key: string, value: string | File | undefined) => void;
  value?: string | File | undefined;
  required: boolean;
  //   bodyKey: string;
  // type: 'textarea' | 'file';
}

const OtherInputs = ({
  label,
  placeholder,
  type,
  onchange,
  required,
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
        <>
          <textarea
            cols={30}
            rows={5}
            onChange={(e) => onchange(label, e.target.value)}
            placeholder={placeholder}
            required={required}
            maxLength={500}
            value={typeof value === 'string' ? value : ''}
            className="border-[1px] rounded-lg resize-none border-gray-800 p-2 outline-none"
          ></textarea>
          <p className="text-xs text-gray-800 -mt-3">(max 500 characters)</p>
        </>
      ) : (
        <>
          <div className="min-h-[40px] flex justify-between bg-transparent border-dashed border-[1px] border-gray-800 p-2 py-1 rounded-lg bg-[#1A1919] items-center outline-none text-gradient1">
            <div className="max-h-10 max-w-10 rounded-full">
              {((value !== '' && value) || selectedFile !== null) && (
                <Image
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : `https://pub-4dba511debbc404da50bb5d141f735bc.r2.dev/business-aus/${value}`
                  }
                  alt=""
                  height={100}
                  width={100}
                  className="rounded-full mr-4 max-h-10 max-w-10"
                />
              )}
            </div>
            <label className=" text-gray-800 overflow-hidden max-w-[29ch] mr-4 outline-none w-full">
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
          <p className="text-xs text-gray-800 -mt-3">(below 500x500)</p>
        </>
      )}
    </div>
  );
};

export default OtherInputs;
