import { useEffect } from "react";
import { getStorageitem, removeStorageItem } from "@/utils/StorageUtils";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { calculateOtpTimer } from "@/utils/calculateOtpTimer";
import type { ModalType } from "./useProfileEditModals";

interface UseOtpStorageParams {
  openModal: (modal: ModalType) => void;
}
const useOtpStorage = ({ openModal }: UseOtpStorageParams) => {
  useEffect(() => {
    const data = getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);
    if (data?.otpExpiry && data?.serverTime) {
      const remainingTime = calculateOtpTimer(
        Number(data.otpExpiry),
        Number(data.serverTime)
      );

      if (remainingTime > 0) {
        openModal("otp");
      } else {
        removeStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);
      }
    }
  }, [openModal]);
};

export default useOtpStorage;
