import { useState } from "react";
import {
  FormField,
  FormLabel,
  FormInput,
  FormSelect,
  FormError,
} from "./form/index";
import { useFormValidation } from "../hooks/useFormValidation";
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

const experienceOptions = [
  { value: "0-3년", label: "0-3년" },
  { value: "4-7년", label: "4-7년" },
  { value: "8년 이상", label: "8년 이상" },
];

const Form = ({ onSubmit, onCancel }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    experience: "",
    github: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, validateForm, clearFieldError } = useFormValidation(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
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
      clearFieldError(field);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container"
      role="form"
      aria-label="문의 폼"
    >
      <FormField>
        <FormLabel htmlFor="name" required>
          이름 / 닉네임
        </FormLabel>
        <FormInput
          id="name"
          type="text"
          value={formData.name}
          onChange={(value: string) => handleInputChange("name", value)}
          invalid={!!errors.name}
          errorId={errors.name ? "name-error" : undefined}
          required
        />
        <FormError id="name-error" message={errors.name || ""} />
      </FormField>

      <FormField>
        <FormLabel htmlFor="email" required>
          이메일
        </FormLabel>
        <FormInput
          id="email"
          type="email"
          value={formData.email}
          onChange={(value: string) => handleInputChange("email", value)}
          invalid={!!errors.email}
          errorId={errors.email ? "email-error" : undefined}
          required
        />
        <FormError id="email-error" message={errors.email || ""} />
      </FormField>

      <FormField>
        <FormLabel htmlFor="experience" required>
          FE 경력 연차
        </FormLabel>
        <FormSelect
          id="experience"
          value={formData.experience}
          onChange={(value: string) => handleInputChange("experience", value)}
          options={experienceOptions}
          placeholder="선택해주세요"
          invalid={!!errors.experience}
          errorId={errors.experience ? "experience-error" : undefined}
          required
        />
        <FormError id="experience-error" message={errors.experience || ""} />
      </FormField>

      <FormField>
        <FormLabel htmlFor="github">GitHub 링크 (선택)</FormLabel>
        <FormInput
          id="github"
          type="url"
          value={formData.github}
          onChange={(value: string) => handleInputChange("github", value)}
          placeholder="https://github.com/username"
          invalid={!!errors.github}
          errorId={errors.github ? "github-error" : undefined}
        />
        <FormError id="github-error" message={errors.github || ""} />
      </FormField>

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
