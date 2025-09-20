import { ReactNode } from "react";

interface FormLabelProps {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}

const FormLabel = ({
  htmlFor,
  children,
  required = false,
  className = "",
}: FormLabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`form-label ${className}`}>
      {children}
      {required && " *"}
    </label>
  );
};

export default FormLabel;
