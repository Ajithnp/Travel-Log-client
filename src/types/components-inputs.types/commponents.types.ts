import {
  LayoutDashboard,
  ViewIcon,
  User,
  UserCheck,
  Users,
  Store,
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
];

export const vendorSidebarLinks = [
  { name: "Profile", path: "/profile", icon: User },
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Overview", path: "/overview", icon: ViewIcon },
];

export const userSidebarLinks = [
  { name: "Profile", path: "/profile", icon: User },
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Overview", path: "/overview", icon: ViewIcon },
];
