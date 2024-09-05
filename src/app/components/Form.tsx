'use client';
import React, { useState, useEffect, useRef } from 'react';
import InputField from './InputField';
import OtherInputs from './OtherInputs';
import { FaArrowRight } from 'react-icons/fa';
import Loading from './Loading';
import InfoModal from './InfoModal';

import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FormItem } from '../../types';

const Form = () => {
  const [formData, setFormData] = useState<FormItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    userName: '',
    password: '',
  });

  useEffect(() => {
    const getFormData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('/api/form', { method: 'GET' });
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Failed to fetch form data', error);
      }
      setIsLoading(false);
    };
    getFormData();
  }, []);

  const handleInputChange = (
    key: string,
    newValue: string | File | undefined
  ) => {
    setFormData((prev) =>
      prev.map((item) =>
        item.label === key ? { ...item, value: newValue } : item
      )
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const transformedData = formData.reduce(
      (acc: Record<string, File | undefined | string>, item: FormItem) => {
        if (item.arkey) {
          acc[item.arkey] = item.value;
        }
        return acc;
      },
      {}
    );
    // console.log(transformedData);

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ ...transformedData }));
      if (transformedData.businessLogo)
        formData.append('image', transformedData.businessLogo);

      await fetch('/api/users/', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.message) {
            if (res.message.includes('duplicate key')) {
              return toast('Email Already Registered', {
                position: 'top-center',
                autoClose: 1000,
                pauseOnHover: false,
                type: 'error',
                transition: Flip,
                pauseOnFocusLoss: false,
                // hideProgressBar: true,
                draggable: true,
                closeOnClick: true,
              });
            } else {
              return toast('Error Occured. Try Again', {
                position: 'top-center',
                autoClose: 1000,
                pauseOnHover: false,
                type: 'error',
                transition: Flip,
                pauseOnFocusLoss: false,
                // hideProgressBar: true,
                draggable: true,
                closeOnClick: true,
              });
            }
          }
          setIsSuccess(true);
          window.scrollTo(0, 0);
          setUserData({
            userName: res.userName,
            password: res.password,
          });
        });
    } catch (err) {
      console.error(err);
      //   if(err?.message)
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <ToastContainer />
      {isLoading && formData.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mt-16 pb-10 w-full overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {formData.map((item: FormItem, index: number) =>
            ['textArea', 'file'].includes(item.type) ? (
              <OtherInputs
                label={item.label}
                placeholder={item.placeholder}
                type={item.type}
                onchange={handleInputChange}
                key={index}
              />
            ) : (
              <InputField
                label={item.label}
                placeholder={item.placeholder}
                type={item.type}
                onchange={handleInputChange}
                required={item.required || 'false'}
                key={index}
              />
            )
          )}
          <div className="md:col-span-full flex justify-center md:justify-end">
            {isSubmitting ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className=" group flex items-center gap-1 px-4 p-3 bg-white text-[#1A1919] w-fit rounded-lg"
              >
                <h1 className="font-medium">Register</h1>
                <div className="group-hover:translate-x-1 transition-all">
                  <FaArrowRight />
                </div>
              </button>
            )}
          </div>
          {isSuccess && (
            <InfoModal
              userName={userData.userName}
              password={userData.password}
            />
          )}
        </form>
      )}
    </>
  );
};

export default Form;
