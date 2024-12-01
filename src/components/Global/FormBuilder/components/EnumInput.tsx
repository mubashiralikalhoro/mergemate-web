import React, { useState } from "react";
import DropDown from "../../DropDown";
import classNames from "classnames";

type Props = {
  value: any;
  onChange: (value: any) => void;
  options: { label: string; value: any }[];
  className?: string;
  label: string;
  error?: any;
  isEditable?: boolean;
  labelClassName?: any;
  containerClassName?: string;
};

const EnumInput = ({
  value,
  onChange,
  options,
  className,
  containerClassName = "",
  label,
  error,
  isEditable = true,
  labelClassName,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={containerClassName}>
      <div className="flex  w-full justify-between ">
        {label && <div className={labelClassName}>{label}</div>}
        {error && <div className="text-sm text-red-500  px-2 ">{error}</div>}
      </div>
      <div className={classNames(className, "relative")}>
        <div
          className={classNames(
            `my-input ${
              isOpen ? "border-focus-color" : error ? "border-error-color" : "border-color"
            } flex cursor-pointer `,
            {
              "text-gray-500": !value,
            }
          )}
          onClick={() => {
            if (isEditable) {
              setIsOpen((p) => !p);
            }
          }}
        >
          {value ? options.find((item) => item.value === value)?.label : "Select..."}
        </div>
        <div>
          <DropDown
            className="absolute w-full "
            isOpen={isOpen}
            sections={[
              [
                {
                  content: "Select...",
                  onClick: () => {
                    onChange(null);
                    setIsOpen(false);
                  },
                },
                ...options.map((item) => ({
                  content: item.label,
                  onClick: () => {
                    onChange(item.value);
                    setIsOpen(false);
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

export default EnumInput;
