import { 
  LayoutDashboard, 
  Users, 
  Store,
  BarChart3,
  Package,
  ShoppingCart,
  Settings,
  HelpCircle
} from "lucide-react";

export const adminNavItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Users", href: "/users", icon: Users, badge: "12" },
  { title: "Vendors", href: "/vendors", icon: Store }
];

export const vendorNavItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Users", href: "/users", icon: Users, badge: "12" },
];