import {
  LayoutDashboard,
  ViewIcon,
  User,
  UserCheck,
  Users,
  Store,
  Briefcase,
  Layers,
  CalendarCheck,
  ShoppingBag,
  Wallet

} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface SidebarLink {
  name: string;
  path: string;
  icon: LucideIcon;
}

export const adminSidebarLinks = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },

  {
    name: "Vendors verification Request",
    path: "vendor/verification-request",
    icon: UserCheck,
  },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Vendors", path: "/admin/vendors", icon: Store },
  {name: "Categories", path: "/admin/categories", icon :Layers}
];

export const vendorSidebarLinks = [
  { name: "Profile", path: "/vendor/profile", icon: User },
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Packages", path: "/vendor/packages", icon: Briefcase },
  { name: "Category", path: "/vendor/requested-categories", icon: ViewIcon },
  {name: "Schedules", path: "/vendor/scheduled-trips", icon:CalendarCheck}
];

export const userSidebarLinks = [
  { name: "Profile", path: "/profile", icon: User },
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Overview", path: "/overview", icon: ViewIcon },
];


export const navCards = [
  {
    to: "/user/profile",
    icon: User,
    title: "Profile Management",
    desc: "Update personal info and account settings",
    accent: "from-violet-500 to-indigo-500",
    light: "bg-violet-50 text-violet-600",
  },
  {
    to: "/user/booked-packages",
    icon: ShoppingBag,
    title: "Your Packages",
    desc: "Manage bookings and travel details easily",
    accent: "from-sky-500 to-cyan-500",
    light: "bg-sky-50 text-sky-600",
  },
  {
    to: "/user/wallet",
    icon: Wallet,
    title: "Wallet & Transactions",
    desc: "Manage balance and view transaction history",
    accent: "from-emerald-500 to-teal-500",
    light: "bg-emerald-50 text-emerald-600",
  },
];