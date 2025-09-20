import { useState } from "react";
import { openFormModal } from "./hooks/useFormModal";
import ModalProvider from "./components/ModalProvider";
import "./styles/Modal.css";

interface FormData {
  name: string;
  email: string;
  message: string;
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
      <h1 className="page-title">접근성 친화적인 모달 폼</h1>

      <div className="button-container">
        <button onClick={handleOpenModal} className="open-modal-button">
          모달 폼 열기
        </button>
      </div>

      {submittedData && (
        <div className="submitted-data-container">
          <h3 className="submitted-data-title">제출된 데이터:</h3>
          <div className="submitted-data-grid">
            <div>
              <strong>이름:</strong> {submittedData.name}
            </div>
            <div>
              <strong>이메일:</strong> {submittedData.email}
            </div>
            <div>
              <strong>메시지:</strong> {submittedData.message}
            </div>
          </div>
        </div>
      )}

      <ModalProvider />
    </div>
  );
};

export default ModalFormPage;
