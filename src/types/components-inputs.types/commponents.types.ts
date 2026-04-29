import type { FieldConfig } from "@/components/shared/modal/FieldModal";
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

export const emailFields: FieldConfig[] = [
  {
    name: "email",
    label: "New Email Address",
    type: "email",
    placeholder: "you@example.com",
    hint: "We'll send a verification code to this address.",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
  },
];

export const passwordFields: FieldConfig[] = [
  {
    name: "oldPassword",
    label: "Current Password",
    type: "password",
    placeholder: "Enter current password",
    validation: {
      required: "Current password is required",
      minLength: { value: 6, message: "Minimum 6 characters" },
    },
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "At least 6 characters",
    hint: "Use a mix of letters, numbers and symbols.",
    validation: {
      required: "New password is required",
      minLength: { value: 8, message: "Minimum 8 characters" },
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm New Password",
    type: "password",
    placeholder: "Re-enter new password",
    validation: {
      required: "Please confirm your password",
      validate: (value, all) =>
        value === all["newPassword"] || "Passwords do not match",
    },
  },
];