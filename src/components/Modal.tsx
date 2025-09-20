import { useRef, type ReactNode } from "react";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { useFocusManagement } from "../hooks/useFocusManagement";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "../styles/Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  description?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  description,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useKeyboardNavigation({
    isOpen,
    onClose,
    modalRef,
  });

  useFocusManagement({
    isOpen,
    titleRef,
  });

  const prefersReducedMotion = useReducedMotion();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`modal-overlay ${prefersReducedMotion ? "no-animation" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className={`modal-content ${
          prefersReducedMotion ? "no-animation" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
      >
        <h2
          ref={titleRef}
          id="modal-title"
          className="modal-title"
          tabIndex={-1}
        >
          {title}
        </h2>
        {description && (
          <p id="modal-description" className="modal-description">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
