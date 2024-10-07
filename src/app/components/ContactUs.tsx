import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Loading from './Loading';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = (message: string, stype: 'success' | 'error') => {
  return toast(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    type: stype,
    pauseOnHover: false,
    draggable: true,
    theme: 'light',
    transition: Flip,
  });
};

const ContactUs = ({ userId }: { userId: string }) => {
  const [contactForm, setContactForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    subject: '',
    body: '',
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    await fetch('/api/contact/', {
      method: 'POST',
      body: JSON.stringify({ ...userData, userId: userId }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          Toastify('Email Sent', 'success');
        } else {
          Toastify('Cannot send a mail', 'error');
        }
      })
      .catch((err) => {
        Toastify('Cannot send a mail', 'error');
        // console.log(err);
      });
    setIsLoading(false);
    setContactForm(false);
  };
  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        contactForm ? 'h-full opacity-100' : 'h-0 opacity-100'
      }`}
    >
      <ToastContainer />
      {!contactForm ? (
        <button
          onClick={() => setContactForm(true)}
          className="absolute bottom-0 right-10 px-4 py-2 rounded-t-lg bg-black text-white"
        >
          Contact Us
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-white absolute h-full top-0 md:top-auto md:bottom-0 md:max-h-[30rem] md:right-4 lg:right-10 p-4 rounded-t-lg md:max-w-md lg:max-w-lg w-full z-40 border-[1px] border-b-0 border-gray-300 shadow-lg"
        >
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="font-bold text-lg">Contact Form</h1>
            <button
              onClick={() => setContactForm(false)}
              className="p-2 rounded-full hover:bg-gray-300 transition-all"
            >
              <IoCloseOutline size={30} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p>Subject</p>
              <input
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, subject: e.target.value }))
                }
                className="px-4 py-2 outline-none rounded-lg border-[1px] border-gray-300"
                placeholder="Enter the Subject here"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Body</p>
              <textarea
                rows={7}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, body: e.target.value }))
                }
                className="resize-none px-4 py-2 outline-none rounded-lg border-[1px] border-gray-300"
                placeholder="Body of the mail"
              />
            </div>
          </div>
          <div className="flex w-full justify-center">
            {!isLoading ? (
              <button
                type="submit"
                className="px-3 py-2 bg-black text-white font-medium hover:shadow-lg transition-all rounded-lg mt-4"
              >
                Submit
              </button>
            ) : (
              <Loading />
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
