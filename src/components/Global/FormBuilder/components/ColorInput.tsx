import React, { useRef, useEffect } from 'react';

interface ColorInputProps {
  label?: string;
  value?: string;
  onChange: (color: string) => void;
  className?: string;
  error?: string;
  isEditable?: boolean;
  name?: string;
}

const ColorInput: React.FC<ColorInputProps> = ({
  label,
  value = '#000000',
  onChange,
  className = '',
  error,
  isEditable = true,
  name,
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorClick = () => {
    if (colorInputRef.current && isEditable) {
      colorInputRef.current.click();
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="flex items-center justify-start space-x-2 ">
        {/* Hidden Native Color Input */}
        <input
          ref={colorInputRef}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!isEditable}
          name={name}
          className="hidden"
        />

        {/* Visible Color Display and Trigger */}
        <div
          onClick={handleColorClick}
          className={`
            w-8 h-8 rounded-full border border-gray-300
            ${!isEditable ? 'cursor-not-allowed opacity-50' : ''}
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
          style={{
            backgroundColor: isEditable ? value : '#cccccc',
            pointerEvents: isEditable ? 'auto' : 'none',
          }}
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ColorInput;
