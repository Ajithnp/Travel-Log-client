import { useState } from "react";
import { useForm,  type FieldErrors, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "../validations/login-schema";
import { useLoginMutation } from "../hooks/api.hooks";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/user.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ROLE } from "@/types/Role";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { BASE_ROUTE, ROUTES } from "@/lib/constants/routes";

export function useAdminLoginLogic() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginAdmin, isPending } = useLoginMutation();

  const togglePassword = () => setShowPassword(prev => !prev);

  const onSubmit = (data: LoginSchemaType) => {
    loginAdmin(data, {
      onSuccess: (res) => {
        if (res.data.role !== ROLE.ADMIN) {
          return toast.warning(ERROR_MESSAGES.UNAUTHORIZED_ACTION);
        }
        dispatch(setUser(res.data));
        navigate(`${BASE_ROUTE.ADMIN}${ROUTES.DASHBOARD}`);
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || error.message);
      },
    });
  };

  const onError = (errors: FieldErrors<LoginSchemaType>) => {
    const firstError = Object.values(errors)[0] as FieldError | undefined;
    if (firstError?.message) toast.error(firstError.message);
  };

  return {
    showPassword,
    togglePassword,
    form,
    onSubmit,
    onError,
    isPending,
  };
}

