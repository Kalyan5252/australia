import React from 'react';

type optionsProps = {
  label: string;
  value: string;
};

interface InputBox {
  label: string;
  type: string | 'date' | 'text' | 'select';
  placeholder?: string;
  options?: optionsProps[];
  onchange: (key: string, value: string) => void;
  required: boolean;
  //   bodyKey: string;
}

const InputField = ({
  label,
  type,
  placeholder,
  options,
  onchange,
  required,
}: InputBox) => {
  return (
    <div className="flex flex-col h-fit gap-4">
      <label className="text-white flex-1 md:flex-auto text-xl">{label}</label>
      {type === 'select' ? (
        <select
          className="p-2 h-full outline-none text-gray-400  rounded-lg border-[1px] border-gray-300 focus:shadow-lg transition-all"
          onChange={(e) => onchange(label, e.target.value)}
        >
          <option>{placeholder}</option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="p-2 outline-none focus:border-gray-100 bg-transparent text-gray-400 border-b-[1px] border-gray-300 focus:shadow-lg transition-all"
          onChange={(e) => onchange(label, e.target.value)}
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;
