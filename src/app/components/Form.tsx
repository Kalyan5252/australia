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
        // console.log(data);
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
              Toastify('Email Already Registered', 'error');
              return;
            } else {
              Toastify('Error Occured. Try Again', 'error');

              return;
            }
          }
          if (res.status === 'success') {
            Toastify('Check your mail', 'success');
            setTimeout(() => {
              window.location.assign('/login');
            }, 2000);
          }
          setIsSuccess(true);
          window.scrollTo(0, 0);
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
                required={item?.required || true}
                onchange={handleInputChange}
                key={index}
                value={item.value !== '' ? item.value : undefined}
              />
            ) : (
              <InputField
                label={item.label}
                placeholder={item.placeholder}
                type={item.type}
                onchange={handleInputChange}
                options={item.options}
                value={item.value}
                required={item.required || false}
                key={index}
                pattern={item?.pattern !== '' ? item.pattern : ''}
              />
            )
          )}
          <div className="md:col-span-full flex justify-center md:justify-end">
            {isSubmitting ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className=" group flex items-center gap-1 px-4 p-3 text-white hover:shadow-lg bg-[#1A1919] w-fit rounded-lg"
              >
                <h1 className="font-medium">Register</h1>
                <div className="group-hover:translate-x-1 transition-all">
                  <FaArrowRight />
                </div>
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
