import { ReactNode } from "react";

interface FormFieldProps {
  children: ReactNode;
  className?: string;
}

const FormField = ({ children, className = "" }: FormFieldProps) => {
  return <div className={`form-field ${className}`}>{children}</div>;
};

export default FormField;
