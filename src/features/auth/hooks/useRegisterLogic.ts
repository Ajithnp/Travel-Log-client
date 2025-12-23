import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./api.hooks";
import type { SignupSchemaType } from "../validations/register-schema";
import { setStorageItem } from "@/utils/StorageUtils";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { toast } from "sonner";
import { useCallback } from "react";
import { BASE_ROUTE_BY_ROLE, ROUTES } from "@/lib/constants/routes";
interface  UseRegisterLogicParams {
  role:"user"|"vendor"
};
type UseRegisterLogicReturn = {
  handleRegister: (data: SignupSchemaType) => void;
  isLoading: boolean;
};
const useRegisterLogic = ({role}:UseRegisterLogicParams): UseRegisterLogicReturn => {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending: isLoading } = useRegisterMutation();

  const handleRegister = useCallback(
    (data: SignupSchemaType) => {
      registerUser(
        { ...data, role:role },
        {
          onSuccess: (res) => {
            const baseRoute = BASE_ROUTE_BY_ROLE[role];

            setStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL, {
              email: res.data.email,
              role: res.data.role,
              otpExpiry: res.data?.otpExpiresIn,
              serverTime: res.data?.serverTime,
            });

            toast.success(res.message);

            navigate(`${baseRoute}${ROUTES.VERIFY_EMAIL}`);
          },

          onError: (error) => {
            toast.error(error.response?.data?.message);
          },
        }
      );
    },
    [navigate, registerUser,role]
  );

  return { handleRegister, isLoading };
};

export default useRegisterLogic;
