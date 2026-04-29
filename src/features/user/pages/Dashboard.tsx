import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Wallet,
  CheckCheck,
  Star,
} from "lucide-react";
import { useAuthUser } from '@/hooks/useAuthUser'
import { fadeUp, cardHover } from "@/animation/variants";
import { navCards } from "@/types/components-inputs.types/commponents.types";


const stats = [
  { label: "Active Bookings", value: "0", icon: ShoppingBag, color: "text-violet-500", bg: "bg-violet-50" },
  { label: "Wallet Balance", value: "0", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Trips Completed", value: "0", icon: CheckCheck, color: "text-sky-500", bg: "bg-sky-50" },
  { label: "Reviews", value: "0", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
];


function UserDashboard() {
    const { user } = useAuthUser();
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-['Inter'] mt-20">
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Hero greeting */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-slate-400 font-medium mb-1 tracking-wide uppercase">Dashboard</p>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Welcome back, <span className="bg-gradient-to-r from-orange-600 to-indigo-500 bg-clip-text text-transparent">{ user?.name}</span> 👋
            </h1>
          </div>
          {/* <Badge className="hidden md:flex items-center gap-1.5 bg-violet-50 text-violet-700 border border-violet-200 px-3 py-1.5 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Premium Member
          </Badge> */}
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_0_rgba(0,0,0,0.05)]"
            >
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-4.5 h-4.5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-900 leading-none mb-1">{s.value}</p>
              <p className="text-xs text-slate-400 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Navigation Cards */}
          <div className="md:col-span-2 space-y-4">
            <motion.p
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-xs uppercase tracking-widest text-slate-400 font-semibold"
            >
              Quick Access
            </motion.p>
            <div className="grid grid-cols-1 gap-4">
              {navCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  custom={i + 6}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    className="flex items-center gap-5 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_0_rgba(0,0,0,0.05)] cursor-pointer group"
                  >
                    <Link to={card.to} className="flex items-center gap-5 w-full">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.accent} flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <card.icon className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm mb-0.5">
                          {card.title}
                        </p>
                        <p className="text-slate-400 text-xs truncate">{card.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Upgrade banner */}
        <motion.div
          custom={10}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 p-6 flex items-center justify-between gap-4"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.6)_0%,_transparent_60%)]" />
          <div>
            <p className="text-white font-bold text-base mb-1">Unlock Elite Benefits</p>
            <p className="text-violet-200 text-xs max-w-xs">
              Upgrade to Elite for priority bookings, dedicated support, and exclusive deals.
            </p>
          </div>
          <button className="flex-shrink-0 bg-white text-violet-700 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors shadow">
            Upgrade Now
          </button>
        </motion.div>
      </main>
    </div>
  );
}
export default UserDashboard