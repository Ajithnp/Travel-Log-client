import type React from "react";

import { useState } from "react";
import { Shield, Eye, EyeOff, Lock, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loginSchema,
  type LoginSchemaType,
} from "../../validations/login-schema";
import { useLoginMutation } from "../../hooks/auth.hooks";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/store/slices/admin.slice";
import { useNavigate } from "react-router-dom";
import { useForm, type FieldError, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROLE } from "@/types/Role";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { BASE_ROUTE, ROUTES } from "@/lib/constants/routes";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: loginAdmin, isPending } = useLoginMutation();
  const handleShow = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = (data: LoginSchemaType) => {

    loginAdmin(data, {
      onSuccess: (response) => {
        if (response.data.role !== ROLE.ADMIN)
          return toast.warning(ERROR_MESSAGES.UNAUTHORIZED_ACTION);
        dispatch(setAdmin(response.data));
        navigate(`${BASE_ROUTE.ADMIN}${ROUTES.DASHBOARD}`);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || error?.message);
      },
    });
  };

  //useForm
  const onError = (errors: FieldErrors<LoginSchemaType>) => {
    const firstError = Object.values(errors)[0] as FieldError | undefined;
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <div className="text-white/90 text-sm font-medium">
          Secure Admin Portal
        </div>
      </div>

      <div className="relative w-full max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-300/30">
              <Shield className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-white/80 text-sm">
              Sign in to your administrative dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <div>
              <Label className="block text-white/90 text-sm font-medium mb-2">
                Administrator Email
              </Label>
              <Input
                type="email"
                {...register("email")}
                placeholder="admin@company.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-300 focus:ring-blue-300/20"
              />
            </div>

            <div>
              <Label className="block text-white/90 text-sm font-medium mb-2">
                Secure Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your secure password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-300 focus:ring-blue-300/20 pr-10"
                />
                <button
                  type="button"
                  onClick={handleShow}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-lg transition-colors duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Access Admin Panel"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm mb-1">
              Need administrative assistance?
            </p>
            <Button
              variant="link"
              className="text-white/90 hover:text-white p-0 h-auto text-sm font-medium"
            >
              Contact System Administrator
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
            <Lock className="w-3 h-3" />
            <span>
              This is a secure admin portal protected by enterprise-grade
              encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
