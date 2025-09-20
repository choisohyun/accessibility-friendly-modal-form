import { useState, useCallback } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ModalState {
  isOpen: boolean;
  resolve: ((value: FormData | null) => void) | null;
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    resolve: null,
  });

  const openModal = useCallback((): Promise<FormData | null> => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        resolve,
      });
    });
  }, []);

  const closeModal = useCallback(
    (result: FormData | null = null) => {
      if (modalState.resolve) {
        modalState.resolve(result);
      }
      setModalState({
        isOpen: false,
        resolve: null,
      });
    },
    [modalState]
  );

  return {
    isOpen: modalState.isOpen,
    openModal,
    closeModal,
  };
};
