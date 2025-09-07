
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader, Lock, Mail, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { loginSchema ,type LoginSchemaType} from "../../validations/login.schema"
import { useLoginMutation } from "../../hooks/auth.hooks"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setAdmin } from "@/store/slices/admin.slice"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROLE } from "../../types/auth.types"



export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

   const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<LoginSchemaType>({
      resolver: zodResolver(loginSchema)
    });

     

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MotionButton = motion(Button);
  const MotionInput = motion(Input);
  const MotionLabel = motion(Label)


  const {mutate:loginUser , isPending} = useLoginMutation();

  const onSubmit = ( data: LoginSchemaType ) => {
    loginUser(data,
      {
        onSuccess: (response) => {
          if(response.data.role !== ROLE.ADMIN) return toast.warning('Unauthorized action')
          dispatch(setAdmin(response.data))
          navigate('/admin/dashboard')
        },
        onError: (error) => {
           toast.error(error?.response?.data?.message || error?.message);
        }
      }
    )
  }


   const onError = (errors) => {
  const firstError = Object.values(errors)[0]; // Get the first error object
  if (firstError) {
    toast.error(firstError.message); // Show only the first error
  }
};

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Yellow Section - Form */}
      <motion.div
        className="flex-1 bg-yellow-400 flex items-center justify-center p-4 sm:p-6 lg:p-8 order-1 lg:order-1"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">Admin Portal</h2>
            <p className="text-sm sm:text-base text-black/70">Sign in to access your dashboard</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit,onError)}
            className="space-y-4 sm:space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/60" />
                <input
                   {...register("email")}
                  placeholder="Email Address"
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/90 border-2 border-transparent rounded-xl focus:border-black focus:bg-white transition-all duration-300 text-black placeholder-black/60 font-medium text-sm sm:text-base"
                  
                />
               
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/60" />
                <input
                {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/90 border-2 border-transparent rounded-xl focus:border-black focus:bg-white transition-all duration-300 text-black placeholder-black/60 font-medium text-sm sm:text-base"
                  
                  
                />
               
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  variant={"ghost"}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/60 hover:text-black transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </Button>
              </div>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-black text-yellow-400 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-black/90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              disabled={isPending}
            >
              {isPending ? <Loader className="animate-spin" /> : 'Signin'}
            </motion.button>
          </motion.form>

          <motion.div
            className="mt-6 sm:mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-black/70 text-sm sm:text-base">
              Need help?{" "}
              <a href="#" className="text-black font-semibold hover:underline">
                Contact Support
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Black Section - Content */}
      <motion.div
        className="flex-1 bg-black flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[40vh] lg:min-h-screen order-2 lg:order-2"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-lg text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 mb-4 sm:mb-6 leading-tight">
              Welcome Back,
              <br />
              <span className="text-white">Administrator</span>
            </h1>
          </motion.div>

          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
              Access your comprehensive dashboard to manage users, monitor system performance, and oversee all
              administrative functions with ease.
            </p>

            <div className="space-y-3 sm:space-y-4 text-left max-w-sm mx-auto sm:max-w-none">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                <span className="text-white/70 text-sm sm:text-base">Secure authentication system</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                <span className="text-white/70 text-sm sm:text-base">Real-time analytics and reporting</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                <span className="text-white/70 text-sm sm:text-base">Advanced user management tools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                <span className="text-white/70 text-sm sm:text-base">24/7 system monitoring</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <p className="text-white/50 text-xs sm:text-sm">© 2024 Admin Portal. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
