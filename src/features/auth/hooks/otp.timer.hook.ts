import { getStorageitem } from "@/utils/StorageUtils";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { calculateOtpTimer } from "@/utils/calculateOtpTimer";

interface UseOtpTimerReturn {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number | null>>;
}

const useOtpTimer = (trigger?: boolean): UseOtpTimerReturn => {
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    const savedData = getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);

    if (!savedData?.otpExpiry || !savedData.serverTime) {
      setTimer(0);
      return;
    }
    const savedExpiry = Number(savedData?.otpExpiry);
    const savedServerTime = Number(savedData?.serverTime);

    if (Number.isNaN(savedExpiry) || Number.isNaN(savedServerTime)) {
      setTimer(0);
      return;
    }

    const calculatedTime = calculateOtpTimer(savedExpiry, savedServerTime);

    setTimer(calculatedTime > 0 ? calculatedTime : 0);
  }, [trigger]);

  //countdown
  useEffect(() => {
    if (timer === null || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return { timer: timer ?? 0, setTimer };
};

export default useOtpTimer;
