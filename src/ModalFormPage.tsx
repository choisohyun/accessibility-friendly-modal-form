import { useState } from "react";
import { openFormModal } from "./hooks/useFormModal";
import ModalProvider from "./components/ModalProvider";
import "./styles/Modal.css";

interface FormData {
  name: string;
  email: string;
  experience: string;
  github: string;
}

const ModalFormPage = () => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleOpenModal = async () => {
    try {
      const result = await openFormModal();
      if (result) {
        setSubmittedData(result);
      }
    } catch (error) {
      console.error("모달 처리 중 오류:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="button-container">
        <button onClick={handleOpenModal} className="open-modal-button">
          신청 폼 열기
        </button>
      </div>

      {submittedData && (
        <div className="submitted-data-container">
          <h3 className="submitted-data-title">제출된 데이터:</h3>
          <div className="submitted-data-grid">
            <div>
              <strong>이름/닉네임:</strong> {submittedData.name}
            </div>
            <div>
              <strong>이메일:</strong> {submittedData.email}
            </div>
            <div>
              <strong>FE 경력 연차:</strong> {submittedData.experience}
            </div>
            <div>
              <strong>GitHub 링크:</strong> {submittedData.github || "미입력"}
            </div>
          </div>
        </div>
      )}

      <ModalProvider />
    </div>
  );
};

export default ModalFormPage;
