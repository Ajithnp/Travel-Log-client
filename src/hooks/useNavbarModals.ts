import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { setStorageItem } from "@/utils/StorageUtils";

type UserOption = "traveler" | "business";

interface NavbarModalsResult {
  confirmLogout: boolean;
  setConfirmLogout: React.Dispatch<React.SetStateAction<boolean>>;
  showRegistrationModal: boolean;
  setShowRegistrationModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectOption: (option: UserOption) => void;
}

const useNavbarModals = (): NavbarModalsResult => {
  const [confirmLogout, setConfirmLogout] = useState<boolean>(false);
  const [showRegistrationModal, setShowRegistrationModal] =
    useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSelectOption = useCallback(
    (option: UserOption) => {
      if (option === "traveler") {
        setStorageItem("role", "user");
        return navigate("/user/login");
      }
      if (option === "business") {
        setStorageItem("role", "vendor");
        return navigate("/vendor/auth/enter");
      }
      setShowRegistrationModal(false);
    },
    [navigate]
  );

  return {
    confirmLogout,
    setConfirmLogout,
    showRegistrationModal,
    setShowRegistrationModal,
    isMenuOpen,
    setIsMenuOpen,
    handleSelectOption,
  };
};

export default useNavbarModals;
