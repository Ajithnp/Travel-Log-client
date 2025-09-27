
import { setStorageItem, removeStorageItem, getStorageitem } from '@/utils/utils';
import { useEffect, useState } from 'react'
import { LOCAL_STORAGE_KEY } from '@/lib/constants/storageIdentifier';


const useOtpTimer = () => {
    
  const [timer, setTimer] = useState<number>(() => {
          const savedTimer = getStorageitem(LOCAL_STORAGE_KEY.OTP_EXPIRY);
           if(savedTimer){
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            const timeLeft = parseInt(savedTimer, 10) - currentTimeInSeconds;
            return timeLeft > 0 ? timeLeft : 0;
           }
           const expiryTimeInSeconds = Math.floor(Date.now() / 1000) + 63;
           setStorageItem(LOCAL_STORAGE_KEY.OTP_EXPIRY, String(expiryTimeInSeconds));
           return 60
      });
  
      useEffect(() => {
          if (timer <= 0) return;
  
          const interval = setInterval(() => {
              setTimer((prevTimer) => prevTimer - 1);
          }, 1000);
  
          return () => clearInterval(interval);
      }, [timer]);
  
      useEffect(() => {
          if (timer > 0) {
              setStorageItem(LOCAL_STORAGE_KEY.OTP_TIMER, String(timer));
          } else {
  
              removeStorageItem(LOCAL_STORAGE_KEY.OTP_TIMER);
          }
      }, [timer]);

      return { timer, setTimer };
}

export default useOtpTimer
