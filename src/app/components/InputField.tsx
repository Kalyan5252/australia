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
  pattern?: string;
  value?: string | File;
  isEditable?: boolean;
  //   bodyKey: string;
}

const InputField = ({
  label,
  type,
  placeholder,
  options,
  onchange,
  required,
  pattern,
  value,
  isEditable,
}: InputBox) => {
  return (
    <div className="flex flex-col h-fit gap-4">
      <label className="text-gray-800 flex-1 md:flex-auto text-xl">
        {label}
      </label>
      {type === 'select' ? (
        <select
          className="p-2 h-full outline-none text-gray-700 cursor-pointer rounded-lg border-[1px] border-gray-700 transition-all"
          onChange={(e) => onchange(label, e.target.value)}
          value={typeof value === 'string' ? value : ''}
        >
          <option hidden>{placeholder}</option>
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
          className={`p-2 outline-none  bg-transparent border-gray-700 focus:border-gray-800 border-b-[1px]  transition-all ${
            !isEditable ? 'text-gray-500 border-gray-300' : 'text-gray-700 '
          }`}
          onChange={(e) => onchange(label, e.target.value)}
          required={required}
          pattern={pattern}
          readOnly={!isEditable}
          // value={value || ''}
          {...(type !== 'file'
            ? { value: typeof value === 'string' ? value : '' }
            : {})}
        />
      )}
    </div>
  );
};

export default InputField;
