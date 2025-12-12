import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "./useAuthUser";
import { clearUser } from "@/store/slices/user.slice";
import { removeStorageItem } from "@/utils/StorageUtils";
import { toast } from "sonner";
import { useLogoutMutation } from "@/features/auth/hooks/api.hooks";

interface NavbarAuthResult {
  user: ReturnType<typeof useAuthUser>["user"];
  handleLogout: () => void;
  isLoading: boolean;
}

const useNavbarAuth = (): NavbarAuthResult => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAuthUser();
  const { mutate: logout, isPending: isLoading } = useLogoutMutation();

  const handleLogout = useCallback(() => {
    logout(undefined, {
      onSuccess: (response) => {
        toast.success(response?.message);
        dispatch(clearUser());
        removeStorageItem("role");
        navigate("/user/login");
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || error.message);
      },
    });
  }, [logout, dispatch, navigate]);

  return { user, handleLogout, isLoading };
};

export default useNavbarAuth;
