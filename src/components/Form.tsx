import { useState } from "react";
import "../styles/Modal.css";

interface FormData {
  name: string;
  email: string;
  experience: string;
  github: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const Form = ({ onSubmit, onCancel }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    experience: "",
    github: "",
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

    if (!formData.experience.trim()) {
      newErrors.experience = "경력 연차를 선택해주세요.";
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
          이름 / 닉네임 *
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
        <label htmlFor="experience" className="form-label">
          FE 경력 연차 *
        </label>
        <select
          id="experience"
          value={formData.experience}
          onChange={(e) => handleInputChange("experience", e.target.value)}
          aria-invalid={!!errors.experience}
          aria-describedby={errors.experience ? "experience-error" : undefined}
          aria-required="true"
          className="form-input"
        >
          <option value="">선택해주세요</option>
          <option value="0-3년">0-3년</option>
          <option value="4-7년">4-7년</option>
          <option value="8년 이상">8년 이상</option>
        </select>
        {errors.experience && (
          <div id="experience-error" role="alert" className="error-message">
            {errors.experience}
          </div>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="github" className="form-label">
          GitHub 링크 (선택)
        </label>
        <input
          id="github"
          type="url"
          value={formData.github}
          onChange={(e) => handleInputChange("github", e.target.value)}
          aria-invalid={!!errors.github}
          aria-describedby={errors.github ? "github-error" : undefined}
          className="form-input"
          placeholder="https://github.com/username"
        />
        {errors.github && (
          <div id="github-error" role="alert" className="error-message">
            {errors.github}
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
          {isSubmitting ? "제출 중..." : "제출하기"}
        </button>
      </div>
    </form>
  );
};

export default Form;
