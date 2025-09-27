import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Store, Users, TrendingUp } from "lucide-react";

export default function VendorEnterLogin() {
  const MotionButton = motion(Button);
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg rounded-xl border
 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="bg-gray-900 rounded-full p-3">
              <Store className="h-8 w-8 text-primary-foreground" />
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-foreground mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Vendor Login
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Share your business with thousands of customers. Join our
            marketplace and grow your reach today.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 bg-muted p-4 rounded-lg border">
            <Users className="h-5 w-5 text-gray-900" />
            <span className="text-sm text-card-foreground">
              Reach More Customers
            </span>
          </div>
          <div className="flex items-center gap-3 bg-muted p-4 rounded-lg border">
            <TrendingUp className="h-5 w-5 text-gray-900" />
            <span className="text-sm text-card-foreground">
              Boost Your Sales
            </span>
          </div>
          <div className="flex items-center gap-3 bg-muted p-4 rounded-lg border">
            <Store className="h-5 w-5 text-gray-900" />
            <span className="text-sm text-card-foreground">
              Manage Packages
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="text-center">
            <MotionButton
              className="relative z-10 text-base cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              variant={"default"}
              onClick={() => navigate("/vendor/login")}
            >
              Login to Your Account
            </MotionButton>

           
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </motion.div>

        {/* Footer */}
      </div>
    </div>
  );
}
