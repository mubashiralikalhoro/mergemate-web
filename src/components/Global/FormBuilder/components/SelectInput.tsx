import React, { useState } from "react";
import InputField from "./InputField";
import { IoIosClose } from "react-icons/io";
import DropDown from "../../DropDown";

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
  multiselect?: boolean;
  loadValue?: (v: any) => any;
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
  loadValue,
  containerClassName = "",
}: Props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  return (
    <div className={containerClassName}>
      <InputField
        onChange={(e) => onSearchChange(e.target.value)}
        startView={
          value && (
            <div
              className="my-container  bg-background-focused px-2 gap-2  mr-2 text-md rounded  items-center flex justify-center w-fit"
              onClick={() => {
                onChange(null);
              }}
            >
              {loadValue ? loadValue(value) : options.find((item) => item.value === value)?.label}
              <IoIosClose className="hover:scale-110 cursor-pointer text-lg text-red-500" />
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
