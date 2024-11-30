import React, { useState } from 'react';
import InputField from './InputField';
import { IoIosClose } from 'react-icons/io';
import DropDown from '../../DropDown';

interface Props {
  value: any;
  name?: string;
  handleBlur: any;
  error: any;
  onSearchChange: (text: string) => any;
  searchValue: any;
  onChange: (v: any) => any;
  placeholder?: string;
  className?: string;
  label: string;
  options: { value: any; label: string }[];
  isEditable?: boolean;
  containerClassName?: string;
  labelClassName?: any;
}

const SelectInput = ({
  value,
  placeholder,
  handleBlur,
  options,
  className,
  error,
  name,
  searchValue,
  label,
  onSearchChange,
  isEditable = true,
  labelClassName,
  onChange,
  containerClassName = '',
}: Props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  return (
    <div className={containerClassName}>
      <InputField
        onChange={(e) => onSearchChange(e.target.value)}
        startView={
          value && (
            <div
              className=" border-gray-400 border-[1px] bg-gray-300  mr-2 text-md rounded px-[1px]  items-center flex justify-center text-black w-fit"
              onClick={() => {
                onChange(null);
              }}
            >
              <IoIosClose className="hover:scale-110 cursor-pointer text-lg text-gray-500" />
              {options.find((item) => item.value === value)?.label}
            </div>
          )
        }
        isEditable={isEditable}
        labelClassName={labelClassName}
        label={label}
        value={searchValue}
        className={className}
        //   @ts-ignore
        error={error}
        name={name}
        onBlur={(e) => {
          handleBlur && handleBlur(e);
          setTimeout(() => {
            setIsDropDownOpen((p) => false);
          }, 300);
        }}
        onFocus={() => {
          setIsDropDownOpen((p) => true);
        }}
        placeholder={placeholder}
        type="text"
      />

      <div className="relative w-full">
        <div>
          <DropDown
            className="absolute w-full"
            isOpen={isDropDownOpen}
            sections={[
              [
                ...options.map((option) => ({
                  content: option.label,
                  onClick: () => {
                    onChange(option.value);
                    setIsDropDownOpen(false);
                  },
                })),
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
