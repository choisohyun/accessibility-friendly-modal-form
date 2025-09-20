import { forwardRef } from "react";

interface FormInputProps {
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  errorId?: string;
  className?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      type = "text",
      value,
      onChange,
      placeholder,
      required = false,
      invalid = false,
      errorId,
      className = "",
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={invalid}
        aria-describedby={errorId}
        aria-required={required}
        className={`form-input ${className}`}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
