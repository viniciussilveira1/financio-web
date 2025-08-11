import { forwardRef } from "react";

interface TextInputProps {
  label: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      id,
      required,
      placeholder,
      error,
      disabled,
      className = "",
      type,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <label htmlFor={id} className='text-sm font-medium text-gray-700'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>

        <input
          ref={ref}
          id={id}
          type={type || "text"}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full p-3 border rounded-md 
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
            bg-white transition-colors
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-secondary-200"
            } 
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          {...props}
        />

        {error && <span className='text-sm text-red-500'>{error}</span>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
