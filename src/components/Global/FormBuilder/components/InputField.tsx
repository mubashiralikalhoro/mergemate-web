import classNames from "classnames";
import React from "react";

type Props = {
  name?: string;
  className?: string;
  placeholder?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string | undefined | null | boolean;
  type?: string;
  multiline?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  [key: string]: any;
  suggestions?: string[];
  label?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  startView?: React.ReactNode;
  isEditable?: boolean;
  labelClassName?: any;
  containerClassName?: string;
  direction?: "vertical" | "horizontal";
};

const InputField = ({
  name,
  className,
  placeholder,
  value,
  onChange,
  type,
  error,
  label,
  multiline,
  onBlur,
  suggestions,
  onFocus,
  startView,
  labelClassName,
  containerClassName,
  isEditable = true,
  direction = "vertical",
  ...props
}: Props) => {
  return (
    <div
      className={`flex items-center justify-end w-full ${
        direction === "horizontal" ? "flex-row" : "flex-col"
      } ${containerClassName}`}
    >
      <div className="flex w-full justify-between ">
        {label && <div className={`form-label ${labelClassName}`}>{label}</div>}
      </div>
      <div className={classNames("my-input", className)}>
        <div className={` my-focus w-full flex ${error ? "border-error-color" : "border-color"}`}>
          {startView}
          {multiline ? (
            <textarea
              name={name}
              className={`h-32  flex-1 focus:outline-none bg-transparent`}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              disabled={!isEditable}
              {...props}
            />
          ) : (
            <input
              name={name}
              className={`focus:outline-none flex-1 bg-transparent`}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              type={type}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={!isEditable}
              {...props}
              list="suggest"
            />
          )}
          {error && <div className="text-sm text-red-500 -top-2 right-2 px-2 ">{error}</div>}
        </div>
        <datalist id="suggest">
          {suggestions?.map((item, index) => (
            <option key={index} value={item} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default InputField;
