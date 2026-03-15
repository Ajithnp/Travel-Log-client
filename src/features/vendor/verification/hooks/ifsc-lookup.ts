import { useEffect, useRef } from "react";
import type{ UseFormSetValue, UseFormSetError, UseFormClearErrors } from "react-hook-form";
import type{ VendorVerificationFormType } from "../validations/vendor.verification.schema";
import { appConfig } from "@/config/config"; 


interface IfscLookupResult {
  BANK: string;
  BRANCH: string;
  ADDRESS: string;
  CITY: string;
  STATE: string;
}
 
interface UseIfscLookupOptions {
  setValue: UseFormSetValue<VendorVerificationFormType>;
  setError: UseFormSetError<VendorVerificationFormType>;
  clearErrors: UseFormClearErrors<VendorVerificationFormType>;
}
 
export function useIfscLookup(
  ifscValue: string,
  { setValue, setError, clearErrors }: UseIfscLookupOptions,
) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
 
  useEffect(() => {
    // Clear derived fields whenever IFSC changes
    setValue("bankName", "");
    setValue("branch", "");
 
    // Don't fire until we have a complete, valid IFSC
    if (!IFSC_REGEX.test(ifscValue)) return;
 

    if (debounceRef.current) clearTimeout(debounceRef.current);
 
    debounceRef.current = setTimeout(async () => {
      try {
          const res = await fetch(`${appConfig.ifscUrl}/${ifscValue}`);
        
        if (!res.ok) {
          setError("ifsc", { message: "IFSC not found. Please check and retry." });
          return;
        }
 
          const data: IfscLookupResult = await res.json();
         
        clearErrors("ifsc");
        setValue("bankName", data.BANK, { shouldValidate: true });
        setValue("branch", `${data.BRANCH}, ${data.CITY}`, { shouldValidate: true });
      } catch {
        setError("ifsc", { message: "IFSC lookup failed. Check your connection." });
      }
    }, 600); 
 
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [ifscValue]);
}