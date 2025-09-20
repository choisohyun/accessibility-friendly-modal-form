import { useState, useCallback } from "react";
import {
  validateEmail,
  validateRequired,
  validateEmailFormat,
  validateSelect,
} from "../utils/validation";

interface FormData {
  name: string;
  email: string;
  experience: string;
  github: string;
}

interface ValidationErrors {
  [key: string]: string | undefined;
}

export const useFormValidation = (initialData: FormData) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = useCallback((formData: FormData): boolean => {
    const newErrors: ValidationErrors = {};

    const nameError = validateRequired(formData.name, "이름");
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmailFormat(formData.email);
    if (emailError) newErrors.email = emailError;

    const experienceError = validateSelect(formData.experience, "경력 연차");
    if (experienceError) newErrors.experience = experienceError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const clearFieldError = useCallback((field: keyof FormData) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateForm,
    clearFieldError,
    clearAllErrors,
  };
};
