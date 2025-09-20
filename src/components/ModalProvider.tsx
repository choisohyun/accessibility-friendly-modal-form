import { useFormModal } from "../hooks/useFormModal";
import Modal from "./Modal";
import Form from "./Form";

interface FormData {
  name: string;
  email: string;
  experience: string;
  github: string;
}

const ModalProvider = () => {
  const { isOpen, closeModal } = useFormModal();

  const handleSubmit = (data: FormData) => {
    closeModal(data);
  };

  const handleCancel = () => {
    closeModal(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="신청 폼"
      description="이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요."
    >
      <Form onSubmit={handleSubmit} onCancel={handleCancel} />
    </Modal>
  );
};

export default ModalProvider;
