import { forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  errorId?: string;
  className?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      id,
      value,
      onChange,
      options,
      placeholder,
      required = false,
      invalid = false,
      errorId,
      className = "",
    },
    ref
  ) => {
    return (
      <select
        ref={ref}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
        aria-describedby={errorId}
        aria-required={required}
        className={`form-input ${className}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
