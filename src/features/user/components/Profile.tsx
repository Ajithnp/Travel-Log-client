import type { IUser } from "@/types/IUser";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Edit,
  ChevronRight,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/animation/variants";



interface ProfileProps {
  user?: Partial<IUser>;
}

export default function Profile({ user }: ProfileProps) {

  const infoRows = [
    { icon: User, label: "name", value: user?.name },
    { icon: Mail, label: "Email", value: user?.email },
    { icon: Phone, label: "Phone", value: user?.phone },
  ];
  const navigate = useNavigate()
  return (
    <div className="min-h-[60vh] bg-[#fcfcfc] font-['Inter']">
      <main className="w-full max-w-6xl mx-auto px-5 pt-7 pb-10">

        {/* Heading */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-0.5">
              Account
            </p>
            <h1 className="text-2xl font-bold text-slate-900">
              My Profile
            </h1>
          </div>

          <button
            className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 bg-violet-50 hover:bg-violet-100 border border-violet-200 px-3 py-1.5 rounded-xl transition-colors"
            onClick={() => navigate("/user/editProfile")}
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          {/* LEFT PROFILE */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 h-full bg-white rounded-3xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] overflow-hidden flex flex-col"
          >
            {/* banner */}
            <div className="h-24 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500" />

            <div className="px-6 pb-6 -mt-10 flex flex-col items-center text-center flex-1">
              <Avatar className="w-24 h-24 ring-4 ring-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-indigo-500 text-white text-4xl font-extrabold">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <h2 className="mt-3 text-xl font-bold text-slate-900">
                {user?.name}
              </h2>

              <p className="text-sm text-slate-400 mb-4">
                {user?.email}
              </p>

              <div className="flex gap-2 flex-wrap justify-center">
                <Badge variant="verified">Verified</Badge>
              </div>

              <div className="mt-auto w-full pt-6" />
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-2 h-full">
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="h-full bg-white rounded-3xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] p-6 flex flex-col"
            >
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-5">
                Personal Information
              </p>

              <div className="space-y-3 flex-1">
                {infoRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <row.icon className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-400">{row.label}</p>
                        <p className="text-sm font-medium">{row.value}</p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}