
import { setStorageItem, removeStorageItem, getStorageitem } from '@/utils/utils';
import { useEffect, useState } from 'react'



const useOtpTimer = () => {
    
  const [timer, setTimer] = useState<number>(() => {
          const savedTimer = getStorageitem('otpExpiry');
           if(savedTimer){
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            const timeLeft = parseInt(savedTimer, 10) - currentTimeInSeconds;
            return timeLeft > 0 ? timeLeft : 0;
           }
           const expiryTimeInSeconds = Math.floor(Date.now() / 1000) + 60;
           setStorageItem("otpExpiry", String(expiryTimeInSeconds));
           console.log('timer', expiryTimeInSeconds)
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
              setStorageItem('otpTimer', String(timer));
          } else {
  
              removeStorageItem('otpTimer');
          }
      }, [timer]);

      return { timer, setTimer };
}

export default useOtpTimer
