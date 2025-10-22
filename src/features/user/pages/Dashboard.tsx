import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, ShoppingBag, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-bg via-background to-muted">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="mb-6 text-3xl font-bold bg-gradient-primary bg-clip-text mt-20">
            Welcome to Your Dashboard
          </h3>
          <p className="mb-12 text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your profile, track bookings, monitor your wallet, and
            customize your settings.
          </p>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mb-12">
            <Link
              to="/user/profile"
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card shadow-card shadow-md rounded-xl p-6 border border-border/60 hover:shadow-hover transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <User className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Profile Management
                </h3>
                <p className="text-muted-foreground">
                  Update your personal information and account settings
                </p>
              </motion.div>
            </Link>

            <Link
              to="/user/booked-packages"
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card shadow-card shadow-md rounded-xl p-6 border border-border/60 hover:shadow-hover transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your Packages </h3>
                <p className="text-muted-foreground">
                  {" "}
                  Manage your tour bookings, and travel details
                  easily.
                </p>
              </motion.div>
            </Link>

            <Link
              to="/user/wallet"
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card shadow-card shadow-md rounded-xl p-6 border border-border/60 hover:shadow-hover transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <Wallet className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Wallet & Transactions
                </h3>
                <p className="text-muted-foreground">
                  Manage your balance and view transaction history
                </p>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
