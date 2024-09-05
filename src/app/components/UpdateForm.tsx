import React, { useState, useEffect } from 'react';
import { FormItem, FormData } from '../../types';
import InputField from './InputField';
import OtherInputs from './OtherInputs';
import Loading from './Loading';
import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const UpdateForm = ({
  id,
  updateForm,
  setUpdateForm,
}: {
  id: string;
  updateForm: boolean;
  setUpdateForm: (id: boolean) => void;
}) => {
  const [formData, setFormData] = useState<FormItem[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getFormData = async () => {
      try {
        const response = await fetch('/api/form', { method: 'GET' });
        const data: FormItem[] = await response.json();
        setFormData(
          data
            .map((item) => ({
              ...item,
              required: false,
            }))
            .filter((item) => item.type !== 'file')
        );
      } catch (error) {
        console.error('Failed to fetch form data', error);
      }
    };
    getFormData();
  }, []);

  useEffect(() => console.log(formData), [formData]);

  interface FormData {
    [key: string]: string | File | undefined;
    // other specific properties if any
  }

  const filterEmptyFields = (object: FormData) => {
    return Object.entries(object)
      .filter(([key, value]) => value !== '') // Filter out entries where the value is an empty string
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as FormData);
  };

  const handleSubmit = async () => {
    let transformedData = formData.reduce(
      (acc: Record<string, File | undefined | string>, item: FormItem) => {
        if (item.arkey) {
          acc[item.arkey] = item.value;
        }
        return acc;
      },
      {}
    );
    transformedData = filterEmptyFields(transformedData);
    // console.log(transformedData);
    try {
      await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...transformedData }),
      })
        .then((res) => res.json())
        .then((res) => {
          //   console.log(res);
        });
    } catch (err) {
      console.error(err);
      //   if(err?.message)
    }
    window.location.reload();
  };

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

  return (
    <div className="p-8 absolute top-0 left-0 bg-[rgba(0,0,0,1)] flex justify-center items-center h-screen w-full">
      <button
        onClick={() => setUpdateForm(false)}
        className="absolute z-10 top-10 right-10 text-white"
      >
        <IoCloseOutline size={30} />
      </button>
      <div className="flex flex-col gap-12 items-center h-full w-5/6">
        <h1 className="text-2xl border-b-[1px] pb-2">Update Form</h1>
        {formData.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="grid grid-cols-3 gap-4 overflow-y-scroll w-full"
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
                  required={item.required || false}
                  key={index}
                />
              )
            )}
            <div className="col-span-full flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1 px-4 p-3 bg-white text-[#1A1919] w-fit rounded-lg"
              >
                <h1 className="font-medium">Update</h1>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateForm;
