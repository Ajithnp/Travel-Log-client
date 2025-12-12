import { useRef, useEffect, useMemo, useCallback } from "react";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { BASE_ROUTE } from "@/lib/constants/routes";
import { ROUTES } from "@/lib/constants/routes";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { getStorageitem, removeStorageItem } from "@/utils/StorageUtils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "./api.hooks";

interface NewPasswordParams {
  password: string;
}

interface NewPasswordLogicReturn {
  handlePasswordUpdate: (payload: NewPasswordParams) => void;
  isLoading: boolean;
}

const useNewPasswordLogic = (): NewPasswordLogicReturn => {
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const verifyData = useMemo(
    () => getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL),
    []
  );

  const { mutate: forgotPassword, isPending: isLoading } =
    useUpdatePasswordMutation();

  const handlePasswordUpdate = useCallback(
    ({ password }: NewPasswordParams) => {
      if (!verifyData?.email) {
        toast.error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
        return;
      }
      forgotPassword(
        { email: verifyData.email, password },
        {
          onSuccess: (response) => {
            toast.success(response.message);
            timeoutRef.current = setTimeout(() => {
              navigate(`${BASE_ROUTE.USER}${ROUTES.LOGIN}`);
            }, 2000);

            removeStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);
          },
          onError: (error) => {
            toast.error(
              error.response?.data?.message ||
                ERROR_MESSAGES.SOMETHING_WENT_WRONG
            );
          },
        }
      );
    },
    [verifyData.email, forgotPassword, navigate]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    handlePasswordUpdate,
    isLoading,
  };
};

export default useNewPasswordLogic;
