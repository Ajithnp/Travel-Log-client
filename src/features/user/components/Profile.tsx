// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import type { IUser } from "@/types/IUser";
// import { useNavigate } from "react-router-dom";

// import { Edit, Mail, Phone } from "lucide-react";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.1,
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5 },
//   },
// };

// interface ProfileProps {
//   user?: Partial<IUser>;
// }

// export default function Profile({ user }: ProfileProps) {
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-6"
//     >
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left gap-3 md:gap-0">
//         <div>
//           <h1 className="text-3xl font-bold">Profile</h1>
//           <p className="text-muted-foreground">
//             Manage your account information and preferences
//           </p>
//         </div>
//         <Button
//           className="bg-black hover:opacity-90 text-white transition-all duration-300 mx-0 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 cursor-pointer"
//           onClick={() => {
//             navigate("/user/editProfile");
//           }}
//         >
//           <Edit className="mr-2 h-4 w-4" />
//           Edit Profile
//         </Button>
//       </div>

//       <div className="grid gap-6 md:grid-cols-3">
//         {/* Profile Overview */}
//         <motion.div variants={cardVariants} className="md:col-span-1">
//           <Card className="shadow-card hover:shadow-hover transition-all duration-300">
//             <CardHeader className="text-center">
//               <div className="flex justify-center">
//                 <Avatar className="h-20 w-20 mt-3">
//                   <AvatarImage src="/placeholder.svg" alt="Profile" />
//                   <AvatarFallback className="text-lg bg-black text-primary-foreground ">
//                     {user?.name ? user.name[0] : ""}
//                   </AvatarFallback>
//                 </Avatar>
//               </div>
//               <CardTitle className="mt-4">{user?.name}</CardTitle>
//               <div className="flex justify-center gap-2">
//                 {/* <Badge variant="secondary" className="flex items-center gap-1">
//                   <Star className="h-3 w-3" />
//                   Premium
//                 </Badge>
//                 <Badge variant="outline" className="flex items-center gap-1">
//                   <Shield className="h-3 w-3" />
//                   Verified
//                 </Badge> */}
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center gap-3 text-sm">
//                 <Mail className="h-4 w-4 text-muted-foreground" />
//                 <span>{user?.email}</span>
//               </div>
//               <div className="flex items-center gap-3 text-sm">
//                 <Phone className="h-4 w-4 text-muted-foreground" />
//                 <span>{user?.phone}</span>
//               </div>
//               <div className="flex items-center gap-3 text-sm">
//                 {/* <MapPin className="h-4 w-4 text-muted-foreground" />
//                 <span>New York, NY </span> */}
//               </div>
//               <div className="flex items-center gap-3 text-sm">
//                 {/* <Calendar className="h-4 w-4 text-muted-foreground" />
//                 <span>Member since Jan 2023</span> */}
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Profile Details Form */}
//         <motion.div variants={cardVariants} className="md:col-span-2">
//           <Card className="shadow-card">
//             <CardHeader className="pt-4 md:pt-6 text-center md:text-left">
//               <CardTitle>Personal Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName">First Name</Label>
//                   <Input id="firstName" defaultValue={`${user?.name}`} />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   defaultValue={`${user?.email}`}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input id="phone" type="tel" defaultValue={`${user?.phone}`} />
//               </div>

//               <div className="flex gap-3 pt-4"></div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

import { motion,type Variants } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Star,
  Shield,
  TrendingUp,
  Bell,
  CheckCircle2,
  ChevronRight,
  Camera,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const user = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  phone: "+1 (555) 012-3456",
  location: "New York, NY",
  memberSince: "Jan 2023",
  initials: "JD",
};

const infoRows = [
  { icon: Mail, label: "Email", value: user.email },
  { icon: Phone, label: "Phone", value: user.phone },
  { icon: MapPin, label: "Location", value: user.location },
  { icon: Calendar, label: "Member Since", value: user.memberSince },
];

const stats = [
  { label: "Trips", value: "12" },
  { label: "Reviews", value: "8" },
  { label: "Points", value: "1,540" },
];

const activities = [
  { label: "Profile updated", time: "2 days ago", type: "info" },
  { label: "Bali tour confirmed", time: "Apr 24", type: "success" },
  { label: "Wallet credited $50", time: "Apr 21", type: "success" },
];

export function PremiumProfile() {
  return (
    <div className="min-h-screen bg-[#f7f7fb] font-['Inter'] flex flex-col">
      {/* Top nav */}
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-white/85 backdrop-blur border-b border-slate-100 shadow-[0_1px_6px_0_rgba(0,0,0,0.04)]"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-slate-800 text-sm tracking-tight">TravelPro</span>
        </div>
        <button className="relative p-1.5 rounded-full hover:bg-slate-100 transition-colors">
          <Bell className="w-4.5 h-4.5 text-slate-500" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-violet-500" />
        </button>
      </motion.header>

      <main className="flex-1 flex flex-col items-center px-5 pt-7 pb-10 gap-5 max-w-md mx-auto w-full">

        {/* Page heading */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full flex items-center justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-0.5">Account</p>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Profile</h1>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 bg-violet-50 hover:bg-violet-100 border border-violet-200 px-3 py-1.5 rounded-xl transition-colors">
            <Edit className="w-3.5 h-3.5" />
            Edit
          </button>
        </motion.div>

        {/* Avatar card */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full bg-white rounded-3xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] overflow-hidden"
        >
          {/* Gradient banner */}
          <div className="h-20 bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.7)_0%,transparent_70%)]" />
          </div>

          {/* Avatar + identity */}
          <div className="px-6 pb-6 -mt-10 flex flex-col items-center text-center">
            <div className="relative mb-3">
              <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-xl font-bold">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
                <Camera className="w-3 h-3 text-slate-500" />
              </button>
            </div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">{user.name}</h2>
            <p className="text-xs text-slate-400 mb-3">{user.email}</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-violet-50 text-violet-700 border border-violet-200 text-xs px-2.5 py-0.5 flex items-center gap-1">
                <Star className="w-3 h-3" /> Premium
              </Badge>
              <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Verified
              </Badge>
            </div>
          </div>

          {/* Stats row */}
          <div className="border-t border-slate-100 grid grid-cols-3 divide-x divide-slate-100">
            {stats.map((s) => (
              <div key={s.label} className="py-4 flex flex-col items-center gap-0.5">
                <p className="text-base font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full bg-white rounded-3xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] p-5"
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">Personal Information</p>
          <div className="space-y-0">
            {infoRows.map((row, i) => (
              <div key={row.label}>
                <div className="flex items-center gap-3 py-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <row.icon className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 mb-0.5">{row.label}</p>
                    <p className="text-sm font-medium text-slate-800 truncate">{row.value}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                </div>
                {i < infoRows.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full bg-white rounded-3xl border border-slate-100 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] p-5"
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">Recent Activity</p>
          <div className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${a.type === "success" ? "bg-emerald-50" : "bg-sky-50"}`}>
                  <CheckCircle2 className={`w-3.5 h-3.5 ${a.type === "success" ? "text-emerald-500" : "text-sky-500"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{a.label}</p>
                </div>
                <p className="text-xs text-slate-400 flex-shrink-0">{a.time}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Danger zone */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <button className="w-full text-xs font-medium text-slate-400 hover:text-red-500 transition-colors py-2">
            Delete Account
          </button>
        </motion.div>

      </main>
    </div>
  );
}