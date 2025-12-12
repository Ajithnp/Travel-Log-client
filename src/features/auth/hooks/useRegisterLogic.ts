import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./api.hooks";
import type { SignupSchemaType } from "../validations/register-schema";
import { setStorageItem } from "@/utils/StorageUtils";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { toast } from "sonner";
import { BASE_ROUTE, ROUTES } from "@/lib/constants/routes";
import { ROLE } from "@/types/Role";
import { useCallback } from "react";

type UseRegisterLogicReturn = {
  handleRegister: (data: SignupSchemaType) => void;
  isLoading: boolean;
};
const useRegisterLogic = (): UseRegisterLogicReturn => {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending: isLoading } = useRegisterMutation();

  const handleRegister = useCallback(
    (data: SignupSchemaType) => {
      registerUser(
        { ...data, role: ROLE.USER },
        {
          onSuccess: (res) => {
            setStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL, {
              email: res.data.email,
              role: res.data.role,
              otpExpiry: res.data?.otpExpiresIn,
              serverTime: res.data?.serverTime,
            });

            toast.success(res.message);

            navigate(`${BASE_ROUTE.USER}${ROUTES.VERIFY_EMAIL}`);
          },

          onError: (error) => {
            toast.error(error.response?.data?.message);
          },
        }
      );
    },
    [navigate, registerUser]
  );

  return { handleRegister, isLoading };
};

export default useRegisterLogic;
