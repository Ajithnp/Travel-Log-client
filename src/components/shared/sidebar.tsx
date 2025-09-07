// import { motion, AnimatePresence } from "framer-motion";
// import { NavLink, useLocation } from "react-router-dom";
// import { 
//   LayoutDashboard, 
//   Users, 
//   Store,
//   BarChart3,
//   Package,
//   ShoppingCart,
//   Settings,
//   HelpCircle
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// interface SidebarNavProps {
//   isCollapsed: boolean;
//    navItems: Array<any>;
// }

// // const navItems = [
// //   {
// //     title: "Dashboard",
// //     href: "/",
// //     icon: LayoutDashboard,
// //     badge: null
// //   },
// //   {
// //     title: "Users",
// //     href: "/users",
// //     icon: Users,
// //     badge: "12"
// //   },
// //   {
// //     title: "Vendors",
// //     href: "/vendors",
// //     icon: Store,
// //     badge: null
// //   }
// // ];

// const bottomNavItems = [
//   {
//     title: "Settings",
//     href: "/settings",
//     icon: Settings
//   },
//   {
//     title: "Help",
//     href: "/help",
//     icon: HelpCircle
//   }
// ];

// export function SidebarNav({ isCollapsed , navItems}: SidebarNavProps) {
//   const location = useLocation();

//   const NavItem = ({ item, index }: { item: any; index: number }) => {
//     const isActive = location.pathname === item.href;
    
//     return (
//       <motion.li
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: index * 0.1 }}
//       >
//         <NavLink to={item.href}>
//           {({ isActive: linkActive }) => (
//             <Button
//               variant="ghost"
//               className={cn(
//                 "w-full justify-start relative group transition-all duration-200",
//                 isCollapsed ? "px-3" : "px-4",
//                 linkActive || isActive
//                   ? "bg-primary/10 text-primary border-r-2 border-primary" 
//                   : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
//               )}
//               size={isCollapsed ? "sm" : "default"}
//             >
//               <motion.div
//                 className="flex items-center w-full"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <item.icon className={cn(
//                   "transition-colors",
//                   isCollapsed ? "w-4 h-4" : "w-4 h-4 mr-3",
//                   linkActive || isActive ? "text-primary" : ""
//                 )} />
                
//                 <AnimatePresence>
//                   {!isCollapsed && (
//                     <motion.span
//                       initial={{ opacity: 0, width: 0 }}
//                       animate={{ opacity: 1, width: "auto" }}
//                       exit={{ opacity: 0, width: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="font-medium"
//                     >
//                       {item.title}
//                     </motion.span>
//                   )}
//                 </AnimatePresence>

//                 {!isCollapsed && item.badge && (
//                   <motion.span
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className={cn(
//                       "ml-auto px-2 py-1 text-xs rounded-full font-medium",
//                       item.badge === "new" 
//                         ? "bg-primary text-primary-foreground"
//                         : "bg-muted text-muted-foreground"
//                     )}
//                   >
//                     {item.badge}
//                   </motion.span>
//                 )}
//               </motion.div>
              
//               {/* Active indicator */}
//               {(linkActive || isActive) && (
//                 <motion.div
//                   layoutId="activeTab"
//                   className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"
//                   transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                 />
//               )}
//             </Button>
//           )}
//         </NavLink>
//       </motion.li>
//     );
//   };

//   return (
//     <nav className="flex-1 px-4 py-6 space-y-2">
//       <ul className="space-y-1">
//         {navItems.map((item, index) => (
//           <NavItem key={item.href} item={item} index={index} />
//         ))}
//       </ul>

//       <div className="pt-6 mt-6 border-t border-border/50">
//         <ul className="space-y-1">
//           {bottomNavItems.map((item, index) => (
//             <NavItem key={item.href} item={item} index={index + navItems.length} />
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// }

import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavItem[];
}

interface SidebarNavProps {
  isCollapsed: boolean;
  navItems: NavItem[];
}

export function SidebarNav({ isCollapsed, navItems }: SidebarNavProps) {
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <nav className="flex-1 space-y-2 p-4">
      {navItems.map((item, index) => {
        const isActive = isActiveRoute(item.href);
        
        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-11 px-3 font-medium transition-all duration-200",
                isActive 
                  ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                  : "hover:bg-accent/50 hover:text-accent-foreground",
                isCollapsed && "justify-center px-0"
              )}
            >
              <NavLink to={item.href}>
                <div className="flex items-center gap-3 w-full">
                  <item.icon className={cn(
                    "shrink-0 transition-transform duration-200",
                    isActive ? "scale-110" : "",
                    isCollapsed ? "w-5 h-5" : "w-4 h-4"
                  )} />
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between w-full"
                      >
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto bg-vendor-accent text-vendor-accent-foreground text-xs px-2 py-0.5 rounded-full font-medium"
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </NavLink>
            </Button>
          </motion.div>
        );
      })}
    </nav>
  );
}