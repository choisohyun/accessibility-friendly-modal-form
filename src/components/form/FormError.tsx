interface FormErrorProps {
  id: string;
  message: string;
  className?: string;
}

const FormError = ({ id, message, className = "" }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div id={id} role="alert" className={`error-message ${className}`}>
      {message}
    </div>
  );
};

export default FormError;
