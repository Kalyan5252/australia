'use client';
import React, { useState, useEffect, useRef } from 'react';
import InputField from './InputField';
import OtherInputs from './OtherInputs';
import { FaArrowRight } from 'react-icons/fa';
import Loading from './Loading';
import InfoModal from './InfoModal';

import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FormItem, dataProps, userProps } from '@/types';

const userForm = ({ id, userData }: { id: string; userData: userProps }) => {
  const [formData, setFormData] = useState<FormItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [userData, setUserData] = useState({
  //   userName: '',
  //   password: '',
  // });

  useEffect(() => {
    const getFormData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/form', { method: 'GET' });
        const data: FormItem[] = await response.json();
        // console.log('test check:', data);
        // console.log('user check from 2:', userData);
        // const updatedDataFields = data.map((field) => {
        //   const key = field.arkey as keyof dataProps;
        //   field.value = userData?.data[key] ?? '';
        //   console.log('key check', key, userData?.data[key]);
        //   // console.log('fied:', field);
        //   return field;
        // });
        // console.log('updated Fields: ', updatedDataFields);
        setFormData(
          data.filter((doc) => !['email', 'abn'].includes(doc.arkey))
        );
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

      await fetch(`/api/users/${id}`, {
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
          } else {
            toast('Registered Successfully', {
              position: 'top-center',
              autoClose: 1000,
              pauseOnHover: false,
              type: 'success',
              transition: Flip,
              pauseOnFocusLoss: false,
              // hideProgressBar: true,
              draggable: true,
              closeOnClick: true,
            });
            setTimeout(() => {
              window.location.assign('/login');
            }, 2000);
          }
          setIsSuccess(true);
          // window.scrollTo(0, 0);
          // setUserData({
          //   userName: res.userName,
          //   password: res.password,
          // });
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
          className="mt-4 pb-10 w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {formData.map((item: FormItem, index: number) =>
            ['textArea', 'file'].includes(item.type) ? (
              <OtherInputs
                label={item.label}
                placeholder={item.placeholder}
                type={item.type}
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

export default userForm;
