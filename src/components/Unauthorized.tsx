import { motion } from "framer-motion";
import {
  Lock,
  ArrowRight,
  ShieldAlert,
  Home,
  Plane,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/animation/variants";



const links = [
  { icon: Home, label: "Home", href: "#" },
 
];

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#f7f3ef] flex flex-col items-center justify-center px-4 overflow-hidden relative">


      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span className="text-[22vw] sm:text-[20vw] lg:text-[18vw] font-black text-[#e8e0d8] leading-none tracking-tighter">
          403
        </span>
      </motion.div>

    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-[15%] left-[8%] sm:left-[14%] opacity-25 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Plane className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400 rotate-12" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-[18%] right-[8%] sm:right-[14%] opacity-25 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="absolute top-[22%] right-[10%] sm:right-[20%] opacity-20 pointer-events-none"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500" />
        </motion.div>
      </motion.div>


      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full gap-5">

 
        <motion.div {...fadeUp}>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.12 }}
            className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-1 shadow-sm"
          >
            <ShieldAlert className="w-8 h-8 text-rose-500" />
          </motion.div>
        </motion.div>

 
        <motion.div {...fadeUp}>
          <span className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-500 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            <Lock className="w-3 h-3" />
            Access Denied
          </span>
        </motion.div>

 
        <motion.div {...fadeUp} className="space-y-2.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 leading-tight">
            Unauthorised
          </h1>
          <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed max-w-xs mx-auto">
            You don't have permission to access this destination. Please sign in or contact support if you think this is a mistake.
          </p>
        </motion.div>


        <motion.div {...fadeUp} className="w-full flex justify-center">
          <Button className="h-11 px-7 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm gap-2 shadow-lg shadow-rose-200 border-0 transition-all">
            Sign In to Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>


        <motion.div {...fadeUp} className="flex items-center gap-3 w-full max-w-xs">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium">or go to</span>
          <div className="flex-1 h-px bg-slate-200" />
        </motion.div>

   
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.46 }}
          className="flex items-center gap-2 flex-wrap justify-center"
        >
          {links.map(({ icon: Icon, label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.52 + i * 0.07 }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50/50 text-slate-600 hover:text-rose-600 text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </motion.a>
          ))}
        </motion.div>

      </div>
    </div>
  );
}