import { useState, useCallback } from "react";

export type ModalType = "email" | "otp" | "password";

interface UseModalManagerReturn {
  activeModal: ModalType | null;
  openModal: (modalName: ModalType) => void;
  closeModal: () => void;
}

export const useModalManager = ():UseModalManagerReturn => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const openModal = useCallback((modalName: ModalType) => {
    setActiveModal(modalName);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  return { activeModal, openModal, closeModal };
};
