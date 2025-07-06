import type { AuthResponse } from "../types/auth.response";
import { login } from "../services/authService";
import type { ILoginPayload } from "../types/auth.types"; 
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {type Role } from "../types/role";

import { useDispatch } from 'react-redux';
import { setUser } from "@/store/slices/user.slice";
import { setVendor } from "@/store/slices/vendor.slice";
import { setAdmin } from "@/store/slices/admin.slice";
import { setStorageItem } from "@/utils/utils";

// role -based redux-dispatch
const roleDispatchdMap = {
    user:setUser,
    vendor:setVendor,
    admin: setAdmin
};

// role- based redirect
const roleRedirectMap = {
    user : '/',
    vendor: '/vendor/',
    admin: '/admin/dashboard'
};



export const useLoginMutation = (role:Role) => {

    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    return useMutation <AuthResponse, Error, ILoginPayload>({
       mutationFn: login,

       onSuccess: (response) => {
        toast.success("Login successful!");

        // redirect to home page
        const roleDispatcher = roleDispatchdMap[role];
        dispatch(roleDispatcher(response.user))

        setStorageItem(`${role}Session`,response.user);

        navigate(roleRedirectMap[role] || '/');


       },
       onError: (error) => {
        console.error("Login error:", error);
        const errorMessage =  error.message || "Login failed.";

        toast.error(errorMessage,{
            position: 'top-center',
            duration: 3000,
            style: {
                background: '#f44336',
                color: '#fff',
            },
        });
       },  
    })
}
