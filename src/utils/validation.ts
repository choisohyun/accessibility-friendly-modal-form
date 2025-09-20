export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (
  value: string,
  fieldName: string
): string | null => {
  if (!value.trim()) {
    return `${fieldName}을(를) 입력해주세요.`;
  }
  return null;
};

export const validateEmailFormat = (email: string): string | null => {
  if (!email.trim()) {
    return "이메일을 입력해주세요.";
  }
  if (!validateEmail(email)) {
    return "올바른 이메일 형식을 입력해주세요.";
  }
  return null;
};

export const validateSelect = (
  value: string,
  fieldName: string
): string | null => {
  if (!value.trim()) {
    return `${fieldName}을(를) 선택해주세요.`;
  }
  return null;
};

export const validateUrl = (url: string): string | null => {
  if (!url.trim()) {
    return null; // 선택 필드이므로 빈 값은 허용
  }

  try {
    new URL(url);
    return null;
  } catch {
    return "올바른 URL 형식을 입력해주세요.";
  }
};
