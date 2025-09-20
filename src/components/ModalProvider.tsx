import { useFormModal } from "../hooks/useFormModal";
import Modal from "./Modal";
import Form from "./Form";

interface FormData {
  name: string;
  email: string;
  message: string;
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
      title="문의하기"
      description="아래 폼을 작성하여 문의사항을 보내주세요."
    >
      <Form onSubmit={handleSubmit} onCancel={handleCancel} />
    </Modal>
  );
};

export default ModalProvider;
