import { useState } from "react";
import "../styles/Modal.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const Form = ({ onSubmit, onCancel }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "메시지를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = document.querySelector(
        '[aria-invalid="true"]'
      ) as HTMLElement;
      if (firstErrorField) {
        firstErrorField.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container"
      role="form"
      aria-label="문의 폼"
    >
      <div className="form-field">
        <label htmlFor="name" className="form-label">
          이름 *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-required="true"
          className="form-input"
        />
        {errors.name && (
          <div id="name-error" role="alert" className="error-message">
            {errors.name}
          </div>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email" className="form-label">
          이메일 *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-required="true"
          className="form-input"
        />
        {errors.email && (
          <div id="email-error" role="alert" className="error-message">
            {errors.email}
          </div>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="message" className="form-label">
          메시지 *
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-required="true"
          rows={4}
          className="form-input form-textarea"
        />
        {errors.message && (
          <div id="message-error" role="alert" className="error-message">
            {errors.message}
          </div>
        )}
      </div>

      <div className="form-buttons" role="group" aria-label="폼 액션 버튼">
        <button
          type="button"
          onClick={onCancel}
          className="cancel-button"
          aria-label="모달 닫기"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
          aria-label={isSubmitting ? "제출 중입니다" : "폼 제출"}
        >
          {isSubmitting ? "제출 중..." : "제출"}
        </button>
      </div>
    </form>
  );
};

export default Form;
