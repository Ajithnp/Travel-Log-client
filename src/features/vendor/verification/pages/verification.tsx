import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  User,
  Building2,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  Clock,
  Star,
  AlertCircle,
  Phone,
  BadgeCheck,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

const steps = [
  {
    icon: User,
    title: "Personal Identity",
    desc: "Government-issued ID or passport",
    color: "text-blue-600",
    iconBg: "bg-blue-50",
    border: "border-blue-100",
    dot: "bg-blue-500",
  },
  {
    icon: Building2,
    title: "Business Registration",
    desc: "Trade license or company certificate",
    color: "text-violet-600",
    iconBg: "bg-violet-50",
    border: "border-violet-100",
    dot: "bg-violet-500",
  },
  {
    icon: FileText,
    title: "Tax & Compliance",
    desc: "VAT certificate and tax documents",
    color: "text-emerald-600",
    iconBg: "bg-emerald-50",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
  },
  {
    icon: CreditCard,
    title: "Bank Account",
    desc: "Verified bank statement or IBAN",
    color: "text-amber-600",
    iconBg: "bg-amber-50",
    border: "border-amber-100",
    dot: "bg-amber-500",
  },
  {
    icon: Phone,
    title: "Contact Verification",
    desc: "Phone number & email confirmation",
    color: "text-rose-600",
    iconBg: "bg-rose-50",
    border: "border-rose-100",
    dot: "bg-rose-500",
  },
];

const perks = [
  { icon: Star, text: "Unlock all platform features", color: "text-amber-500" },
  {
    icon: BadgeCheck,
    text: "Display Verified Partner badge",
    color: "text-blue-500",
  },
  {
    icon: Sparkles,
    text: "Priority listing in search",
    color: "text-violet-500",
  },
  {
    icon: ShieldCheck,
    text: "Trusted by 2,400+ travelers",
    color: "text-emerald-500",
  },
];

export default function ForceVerification() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] w-full bg-slate-50 flex flex-col items-center justify-center py-8 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {/* 3D Hero Shield Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1 shadow-premium ">
          <Card className="border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden h-full">
            {/* Top gradient band */}
            <div className="relative h-36 sm:h-44 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50" />

              {/* Grid */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Animated orbs */}
              <motion.div
                animate={{ y: [-6, 6, -6], x: [-3, 3, -3] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-4 right-12 w-20 h-20 rounded-full opacity-25"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #a5f3fc, #0ea5e9)",
                  boxShadow:
                    "0 0 40px rgba(14,165,233,0.5), inset 0 0 15px rgba(255,255,255,0.3)",
                }}
              />
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-3 left-16 w-12 h-12 rounded-full opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #c4b5fd, #8b5cf6)",
                  boxShadow: "0 0 25px rgba(139,92,246,0.4)",
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.28, 0.15] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />

              {/* Status badge */}
              <div className="absolute top-4 left-4">
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Badge className="bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1 shadow-sm">
                    <AlertCircle className="w-3 h-3 mr-1.5 text-amber-500" />
                    Verification Required
                  </Badge>
                </motion.div>
              </div>
            </div>

            <CardContent className="px-6 pt-0 pb-6 -mt-10 relative">
              {/* 3D Shield Icon */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                  delay: 0.2,
                }}
                className="flex justify-center mb-5"
              >
                <div className="relative">
                  {/* Glow ring */}
                  <motion.div
                    animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 blur-md"
                  />
                  {/* Outer shell */}
                  <div
                    className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 shadow-xl shadow-blue-300/40 flex items-center justify-center"
                    style={{
                      boxShadow:
                        "0 12px 40px rgba(99,102,241,0.35), 0 2px 0 rgba(255,255,255,0.25) inset, 0 -2px 0 rgba(0,0,0,0.1) inset",
                    }}
                  >
                    {/* Inner highlight */}
                    <div className="absolute inset-1 rounded-xl bg-gradient-to-b from-white/20 to-transparent" />
                    <ShieldCheck
                      className="w-10 h-10 text-white relative z-10 drop-shadow-md"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.div variants={itemVariants} className="text-center mb-5">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Verify Your Account
                </h1>
                <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
                  Complete your verification to unlock full platform access and
                  start receiving bookings from trusted travelers.
                </p>
              </motion.div>

              {/* Locked banner */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
                  <div className="p-1.5 bg-amber-100 rounded-lg flex-shrink-0">
                    <Lock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-amber-800 text-sm font-semibold">
                      Account features are locked
                    </p>
                    <p className="text-amber-600 text-xs mt-0.5">
                      You cannot receive bookings or publish packages until
                      verification is complete.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Primary CTA */}
              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onTapStart={() => setButtonPressed(true)}
                  onTap={() => setTimeout(() => setButtonPressed(false), 600)}
                >
                  <Button
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white border-0 shadow-lg shadow-blue-300/40 relative overflow-hidden group lg:mt-9"
                    style={{
                      boxShadow:
                        "0 6px 24px rgba(99,102,241,0.35), 0 1px 0 rgba(255,255,255,0.2) inset",
                }}
                    onClick={()=> navigate('/vendor/verification')}                  
                  >
                    <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
                    <AnimatePresence mode="wait">
                      {buttonPressed ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Sparkles className="w-5 h-5" />
                          </motion.div>
                          Starting verification…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <ShieldCheck className="w-5 h-5" />
                          Start Verification
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>

                <div className="flex items-center justify-center gap-1.5 mt-2.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400 text-xs">
                    Takes approximately 5–10 minutes to complete
                  </span>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-4">
          {/* Verification Steps */}
          <motion.div variants={itemVariants} className="shadow-premium">
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-5">
                <h2 className="text-slate-800 font-bold text-sm mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  What You'll Need
                </h2>

                <div className="space-y-2">
                  {steps.map(
                    (
                      { icon: Icon, title, desc, color, iconBg, border, dot },
                      i,
                    ) => (
                      <motion.div
                        key={title}
                        onHoverStart={() => setHovered(i)}
                        onHoverEnd={() => setHovered(null)}
                        whileHover={{ x: 4 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className={`flex items-center gap-3.5 p-3.5 rounded-xl border transition-all cursor-default ${hovered === i ? `${border} ${iconBg}` : "border-slate-100 bg-slate-50/60"}`}
                      >
                        {/* Step number */}
                        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-slate-400">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Icon */}
                        <div
                          className={`relative p-2.5 rounded-xl flex-shrink-0 transition-all ${hovered === i ? iconBg : "bg-white"} border ${hovered === i ? border : "border-slate-100"} shadow-sm`}
                          style={
                            hovered === i
                              ? {
                                  boxShadow:
                                    "0 4px 12px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset",
                                }
                              : {}
                          }
                        >
                          <Icon
                            className={`w-4 h-4 transition-colors ${hovered === i ? color : "text-slate-400"}`}
                          />
                          {/* 3D highlight dot */}
                          <div
                            className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white transition-all ${hovered === i ? dot : "bg-slate-200"}`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-semibold transition-colors ${hovered === i ? "text-slate-900" : "text-slate-700"}`}
                          >
                            {title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {desc}
                          </p>
                        </div>
                      </motion.div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits */}
          <motion.div variants={itemVariants} className="shadow-premium">
            <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden">
              <CardContent className="p-5">
                <h2 className="text-slate-800 font-bold text-sm mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-amber-50 rounded-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  What You'll Unlock
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {perks.map(({ icon: Icon, text, color }, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.5 + i * 0.08,
                        type: "spring",
                        stiffness: 240,
                        damping: 22,
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-default"
                    >
                      <div
                        className="p-2 rounded-lg bg-white border border-slate-100 shadow-sm flex-shrink-0"
                        style={{
                          boxShadow:
                            "0 2px 8px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.9) inset",
                        }}
                      >
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <span className="text-slate-700 text-xs sm:text-sm font-medium">
                        {text}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-slate-200 ml-auto flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer trust line */}
        <motion.div variants={itemVariants} className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
            <div className="p-1 rounded-full bg-white border border-slate-200 shadow-sm">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
            </div>
            <span>Your documents are encrypted and securely stored</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
