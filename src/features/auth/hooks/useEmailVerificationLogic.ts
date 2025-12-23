import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { setUser } from "@/store/slices/user.slice";
import { useVerifyEmailMutation } from "../hooks/api.hooks";
import { getStorageitem, removeStorageItem } from "@/utils/StorageUtils";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { BASE_ROUTE, ROUTES } from "@/lib/constants/routes";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { ROLE } from "@/types/Role";

interface UseEmailVerificationReturn {
  email: string | null;
  verifyOtp: (otp: string) => void;
  isLoading: boolean;
}

const useEmailVerificationLogic = (): UseEmailVerificationReturn => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedData = useMemo(
    () => getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL),
    []
  );

  const { mutate: verifyEmail, isPending: isLoading } =
    useVerifyEmailMutation();

  const verifyOtp = useCallback(
    (otp: string) => {
      if (!storedData?.email) {
        toast.error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
        return;
      }

      verifyEmail(
        { email: storedData.email, otp },
        {
          onSuccess(res) {
            if (res.data.role !== ROLE.VENDOR && res.data.role !== ROLE.USER) {
              toast.warning(ERROR_MESSAGES.USER_NOT_FOUND);
              return;
            }

            dispatch(setUser(res.data));
            removeStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);
            toast.success(res.message);

            if (res.data?.role === ROLE.USER) {
              navigate(ROUTES.HOME);
            } else {
              navigate(`${BASE_ROUTE.VENDOR}/`);
            }
          },
          onError(error) {
            toast.error(
              error?.response?.data?.message ||
                ERROR_MESSAGES.SOMETHING_WENT_WRONG
            );
          },
        }
      );
    },
    [storedData?.email, verifyEmail, dispatch, navigate]
  );

  return {
    email: storedData?.email || null,
    verifyOtp,
    isLoading,
  };
};

export default useEmailVerificationLogic;
