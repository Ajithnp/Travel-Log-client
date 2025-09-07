import { LayoutDashboard, ViewIcon, ChartAreaIcon, } from "lucide-react"
import { type LucideIcon } from "lucide-react"

export interface SidebarLink {
  name: string
  path: string
  icon: LucideIcon // pass to child(sidebar)
}

export const adminSidebarLinks = [  // pass to admin
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Overview", path: "/overview", icon: ViewIcon },
    { name: "Chat", path: "/chat", icon: ChartAreaIcon },
  ];

  