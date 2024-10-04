import React, { useState, useEffect } from 'react';
import { FormItem } from '../../types';
import InputField from './InputField';
import OtherInputs from './OtherInputs';
import Loading from './Loading';
import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { userProps, dataProps } from '../../types';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = ({
  id,
  updateForm,
  setUpdateForm,
  userData,
}: {
  id: string;
  updateForm: boolean;
  setUpdateForm: (id: boolean) => void;
  userData: userProps;
}) => {
  const [formData, setFormData] = useState<FormItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getFormData = async () => {
      try {
        const response = await fetch('/api/form', { method: 'GET' });
        const data: FormItem[] = await response.json();

        const updatedFormFields = data.map((field) => {
          const key = field.arkey as keyof dataProps;
          field.value = userData.data[key] ?? ''; // Find the value from userData based on arkey
          return field;
        });

        // console.log('Updated Form Item:', updatedFormFields);
        setFormData(updatedFormFields);
      } catch (error) {
        console.error('Failed to fetch form data', error);
      }
    };
    getFormData();
  }, []);

  // useEffect(() => console.log('updated form data', formData), [formData]);

  interface FormDataProps {
    [key: string]: string | File | undefined;
    // other specific properties if any
  }

  const filterEmptyFields = (object: FormDataProps) => {
    return Object.entries(object)
      .filter(([key, value]) => value !== '') // Filter out entries where the value is an empty string
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as FormDataProps);
  };

  const handleSubmit = async () => {
    setLoading(true);
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
      const reqFormData = new FormData();
      reqFormData.append('data', JSON.stringify({ ...transformedData }));
      if (typeof transformedData.businessLogo === 'object')
        reqFormData.append('image', transformedData.businessLogo);
      await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        body: reqFormData,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status !== 'success') {
            toast('❌ Cannot Update. Try Again Later..', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              type: 'error',
              pauseOnHover: false,
              draggable: true,
              theme: 'light',
              transition: Flip,
            });
          }
          if (res.status === 'success') {
            toast('Updated Successfully', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              type: 'success',
              pauseOnHover: false,
              draggable: true,
              theme: 'light',
              transition: Flip,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
    } catch (err) {
      console.error(err);

      //   if(err?.message)
    }
    setLoading(false);
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
    <div className="p-8 absolute z-10 top-0 left-0 overflow-y-scroll bg-white flex justify-center items-center h-screen w-full">
      <ToastContainer />
      <button
        onClick={() => setUpdateForm(false)}
        className="absolute z-10 top-10 right-10 text-black"
      >
        <IoCloseOutline size={30} />
      </button>
      <div className="flex flex-col gap-12 items-center h-full w-5/6">
        <h1 className="text-2xl border-b-[1px] pb-2">Edit Information</h1>
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
            className="pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
          >
            {formData.map((item: FormItem, index: number) =>
              ['textArea', 'file'].includes(item.type) ? (
                <OtherInputs
                  label={item.label}
                  placeholder={item.placeholder}
                  type={item.type}
                  onchange={handleInputChange}
                  key={index}
                  value={item.value}
                />
              ) : (
                <InputField
                  label={item.label}
                  placeholder={item.placeholder}
                  type={item.type}
                  onchange={handleInputChange}
                  required={item.required || false}
                  key={index}
                  value={item.value}
                  options={item?.options}
                  pattern={item?.pattern}
                  isEditable={item?.isEditable}
                />
              )
            )}
            <div className="col-span-full flex justify-end">
              {!loading ? (
                <button
                  type="submit"
                  className="flex items-center gap-1 px-4 py-2 text-white bg-[#1A1919] w-fit rounded-lg"
                >
                  <h1 className="font-medium">Update</h1>
                </button>
              ) : (
                <Loading />
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateForm;
