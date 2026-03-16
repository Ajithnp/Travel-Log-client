import { motion ,type Variants} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  Users,
  TrendingUp,
  Package,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BarChart3,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const containerVariants:Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants:Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const featureCards = [
  {
    icon: Users,
    title: "Reach More Customers",
    description: "Connect with thousands of active buyers daily",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: TrendingUp,
    title: "Boost Your Sales",
    description: "Real-time analytics to grow your revenue",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Package,
    title: "Manage Packages",
    description: "Full control over your product listings",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
];



export default function VendorEnterLogin() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 md:p-10">
      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 border-slate-200 bg-slate-50 shadow-sm"
          >
            <Sparkles className="h-3 w-3 text-amber-500" />
           Join a growing community of travel creators
          </Badge>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mb-10">

          <div className="flex justify-center mb-5">
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 16 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-xl shadow-slate-300/50">
                <Store className="h-8 w-8 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              >
                <ShieldCheck className="h-3 w-3 text-white" />
              </motion.div>
            </motion.div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3 font-['Inter']">
            Vendor{" "}
            <span className="bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
              Login
            </span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Grow your business with access to thousands of customers. 
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {featureCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className={`group relative flex flex-col gap-3 p-5 rounded-2xl border ${card.border} ${card.bg} hover:shadow-md transition-all duration-300 cursor-default overflow-hidden shadow-premium`}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{card.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <ChevronRight
                  className={`absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 ${card.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA section */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-base font-semibold rounded-2xl shadow-lg shadow-slate-900/20 gap-2 group transition-all duration-300 shadow-premium"
              onClick={() => navigate('/vendor/login')}
            >
              <BarChart3 className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
              Login to Your Account
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              {/* Shimmer */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                animate={{ translateX: ["−100%", "200%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
              />
            </Button>
          </motion.div>

          <motion.p
            className="text-xs text-slate-400 flex items-center justify-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Secure login · No credit card required · Free to join
          </motion.p>
        </motion.div>

        {/* Divider + footer note */}
        <motion.div
          variants={itemVariants}
          className="mt-10 pt-8 border-t border-slate-100 text-center"
        >
          <p className="text-xs text-slate-400">
            New vendor?{" "}
            <span className="text-slate-700 font-medium underline underline-offset-2 cursor-pointer hover:text-slate-900 transition-colors">
             
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}