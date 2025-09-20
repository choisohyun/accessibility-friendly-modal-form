import { useState, useCallback, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  experience: string;
  github: string;
}

interface ModalState {
  isOpen: boolean;
  resolve: ((value: FormData | null) => void) | null;
  reject: ((reason?: any) => void) | null;
}

let globalModalState: ModalState = {
  isOpen: false,
  resolve: null,
  reject: null,
};

const modalStateListeners = new Set<() => void>();

const notifyListeners = () => {
  modalStateListeners.forEach((listener) => listener());
};

export const openFormModal = (): Promise<FormData | null> => {
  return new Promise((resolve, reject) => {
    globalModalState = {
      isOpen: true,
      resolve,
      reject,
    };
    notifyListeners();
  });
};

export const closeFormModal = (result: FormData | null = null) => {
  if (globalModalState.resolve) {
    globalModalState.resolve(result);
  }
  globalModalState = {
    isOpen: false,
    resolve: null,
    reject: null,
  };
  notifyListeners();
};

export const useFormModal = () => {
  const [modalState, setModalState] = useState<ModalState>(globalModalState);

  const updateState = useCallback(() => {
    setModalState({ ...globalModalState });
  }, []);

  useEffect(() => {
    modalStateListeners.add(updateState);
    return () => {
      modalStateListeners.delete(updateState);
    };
  }, [updateState]);

  return {
    isOpen: modalState.isOpen,
    closeModal: closeFormModal,
  };
};
