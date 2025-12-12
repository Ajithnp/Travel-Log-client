import { useSelector } from "react-redux";
import type{ RootState } from "@/store/store";
import type { IUserSlice } from "@/store/slices/user.slice";

export type UseAuthUserReturn = {
  user: IUserSlice | null;
  isLoggedIn: boolean;
};

export const useAuthUser = ():UseAuthUserReturn => {
    const user = useSelector((state: RootState) => state.user.user);
    const isLoggedIn = !!user

    return { user, isLoggedIn };
}