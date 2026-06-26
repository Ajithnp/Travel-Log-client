import { motion } from "framer-motion";
import {
  Compass,
  MapPin,
  ArrowRight,
  Home,
  Search,
  Plane,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { fadeUp } from "@/animation/variants";





export default function NotFound404({ pathname }: { pathname: string }) {
  const suggestions = [
    { icon: Home, label: "Home", href: `${pathname.split("/")[1]}` },
    { icon: Search, label: "Explore", href: `${pathname.split("/")[1]}` },
    { icon: MapPin, label: "Destinations", href: `${pathname.split("/")[1]}` },
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ef] flex flex-col items-center justify-center px-4 overflow-hidden relative">

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="text-[22vw] sm:text-[20vw] lg:text-[18vw] font-black text-[#e8e0d8] leading-none tracking-tighter"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          404
        </span>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute top-[15%] left-[8%] sm:left-[14%] opacity-30"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Plane className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400 rotate-12" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="absolute bottom-[18%] right-[8%] sm:right-[14%] opacity-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="absolute top-[22%] right-[10%] sm:right-[20%] opacity-20"
      >
        <motion.div
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
        </motion.div>
      </motion.div>


      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full gap-5">


        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-500 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            <Plane className="w-3 h-3" />
            Lost in transit
          </span>
        </motion.div>


        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 leading-tight">
            Page not found
          </h1>
          <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed max-w-xs mx-auto">
            Looks like this destination doesn't exist on our map. The page may have moved or the URL might be incorrect.
          </p>
        </motion.div>


        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="w-full flex justify-center"
        >
          <Button
            className="h-11 px-7 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm gap-2 shadow-lg shadow-orange-200 border-0 transition-all"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>


        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 w-full max-w-xs"
        >
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium">or explore</span>
          <div className="flex-1 h-px bg-slate-200" />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.45 }}
          className="flex items-center gap-2 flex-wrap justify-center"
        >
          {suggestions.map(({ icon: Icon, label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50/50 text-slate-600 hover:text-orange-600 text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-colors cursor-pointer"
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
