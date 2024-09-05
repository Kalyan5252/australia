import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const CreateFormField = ({
  setFormModal,
}: {
  setFormModal: (val: boolean) => void;
}) => {
  const [formData, setFormData] = useState({
    label: '',
    type: 'text',
    required: false,
    placeholder: '',
  });
  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/form', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        window.location.assign('/dashboard');
      }
    } catch (error) {}
  };

  return (
    <div className="p-8 absolute top-0 left-0 bg-[rgba(0,0,0,1)] flex justify-center items-center h-screen w-full">
      <button
        onClick={() => setFormModal(false)}
        className="absolute z-10 top-10 right-10 text-white"
      >
        <IoCloseOutline size={30} />
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-8 max-w-md w-full"
      >
        <h1 className="text-2xl border-b-[1px] border-gray-400 w-fit self-center">
          New Form Field
        </h1>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl">Label</h1>
          <input
            type="text"
            placeholder="Provide field label"
            className="p-2 outline-none focus:border-gray-100 bg-transparent text-gray-400 border-b-[1px] border-gray-300 focus:shadow-lg transition-all"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, label: e.target.value }))
            }
            required
          />
        </div>
        <div className="flex justify-between gap-2">
          <h1 className="text-xl">Input type</h1>
          <select
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, type: e.target.value }))
            }
            className="text-lg p-1 bg-transparent outline-none border-[1px] rounded-lg border-gray-400"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="tel">mobile</option>
            <option value="file">File</option>
          </select>
        </div>
        <div className="flex justify-between gap-2">
          <h1 className="text-xl">Required</h1>
          <select
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                required: e.target.value === 'true' ? true : false,
              }))
            }
            className="text-lg p-1 bg-transparent outline-none border-[1px] rounded-lg border-gray-400"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl">Placeholder</h1>
          <input
            type="text"
            placeholder="Field Placeholder"
            className="p-2 outline-none focus:border-gray-100 bg-transparent text-gray-400 border-b-[1px] border-gray-300 focus:shadow-lg transition-all"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, placeholder: e.target.value }))
            }
            required
          />
        </div>

        <button
          type="submit"
          className="flex self-center items-center gap-1 px-4 py-2 bg-white text-[#1A1919] w-fit rounded-lg"
        >
          <h1 className="font-medium">Submit</h1>
        </button>
      </form>
    </div>
  );
};

export default CreateFormField;
