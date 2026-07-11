import { motion } from "framer-motion";
import type React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, LogOut, Menu, RouteIcon, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { SidebarLink } from "@/types/components-inputs.types/commponents.types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { removeUnreadTab, selectIsTabUnread } from "@/store/slices/unreadTabSlice";
import { useMarkTabsAsReadMutation } from "@/features/notification/hooks/api.hooks";


interface SideBarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeMobileMenu: () => void;
  sidebarLinks: SidebarLink[];
  onLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({
  isExpanded,
  setIsExpanded,
  isMobile,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  closeMobileMenu,
  sidebarLinks,
  onLogout,
}: SideBarProps) => {


  return (
    <motion.div
      initial={false}
      animate={{
        width: isMobile
          ? isMobileMenuOpen
            ? 256
            : 0
          : isExpanded
            ? 256
            : 64,
        x: isMobile && !isMobileMenuOpen ? -256 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`flex flex-col relative shadow-2xl overflow-hidden
        bg-gradient-to-b from-indigo-950 via-indigo-900 to-violet-950
        border-r border-indigo-800/40
        ${isMobile ? "fixed left-0 top-0 h-full z-50" : "relative"}
        ${isMobile && !isMobileMenuOpen ? "pointer-events-none" : ""}
      `}
    >
      {/* Decorative ambient glow */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 -right-10 w-36 h-36 rounded-full bg-indigo-400/15 blur-2xl" />

      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-indigo-700/40 bg-gradient-to-r from-indigo-900/80 to-violet-900/60 backdrop-blur-sm">
          {(isExpanded || isMobileMenuOpen) && (
            <motion.div
              key="sidebar-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              {/* <img
                className="h-6 md:h-8 drop-shadow-sm"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
                alt="Logo"
              /> */}
              <RouteIcon className="h-7 w-7 text-orange-400 drop-shadow-sm"/>
              <h1 className="text-xl font-bold text-white tracking-tight">TravelLog</h1>
            </motion.div>
          )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (isMobile) {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            } else {
              setIsExpanded(!isExpanded);
            }
          }}
          className="ml-auto p-2 h-8 w-8 text-indigo-200 hover:text-white hover:bg-indigo-700/60 hover:scale-105 transition-all duration-200 rounded-lg"
        >
          {isMobile ? (
            isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )
          ) : isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar nav items */}
      <nav className="flex-1 pt-4 md:pt-6 px-2 overflow-y-auto scrollbar-none">
        {sidebarLinks.map((item, index) => (
      <NavItem
      key={index}
      item={item}
      isExpanded={isExpanded}
      isMobileMenuOpen={isMobileMenuOpen}
      closeMobileMenu={closeMobileMenu}
    />
  ))}
      </nav>

      {/* Logout */}
      <div className="p-3 md:p-4 border-t border-indigo-700/40 bg-gradient-to-t from-indigo-950/80 to-transparent">
        <motion.button
          onClick={() => {
            onLogout(true)
            closeMobileMenu();
          }}
          className={`flex items-center gap-3 w-full py-2.5 md:py-3 px-3 rounded-xl transition-all duration-200 
            text-red-300 hover:text-red-200 hover:bg-red-500/15 
            hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group border border-transparent hover:border-red-500/25 touch-manipulation`}
          whileHover={{ x: isExpanded || isMobileMenuOpen ? 4 : 0 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <LogOut className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
            {(isExpanded || isMobileMenuOpen) && (
              <motion.span
                key="logout-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
        </motion.button>
      </div>
    </motion.div>
  );
};

function NavItem({
  item,
  isExpanded,
  isMobileMenuOpen,
  closeMobileMenu,
}: {
  item: SidebarLink;
  isExpanded: boolean;
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const isUnread = useSelector((state: RootState) => item.tabKey ? selectIsTabUnread(item.tabKey)(state) : false);
 const markTabsAsRead = useMarkTabsAsReadMutation();
  const handleClick = () => {
    if (item.tabKey && isUnread) {
      dispatch(removeUnreadTab(item.tabKey));
      markTabsAsRead.mutate(item.tabKey)
    }
    closeMobileMenu();
  };

  return (
    <motion.div
      whileHover={{ x: isExpanded || isMobileMenuOpen ? 4 : 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <NavLink
        to={item.path}
        onClick={handleClick}
        className={({ isActive }) =>
          `flex items-center py-2.5 md:py-3 px-3 gap-3 rounded-xl transition-all duration-200 mb-1.5 group touch-manipulation 
          ${isActive
            ? "bg-white/15 text-white shadow-lg border border-white/20 backdrop-blur-sm"
            : "text-indigo-200 hover:bg-white/10 hover:text-white hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] border border-transparent hover:border-white/10"
          }`
        }
      >
        <div className="relative flex-shrink-0 w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <item.icon className="w-5 h-5" />
          {isUnread && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-indigo-900" />
          )}
        </div>

          {(isExpanded || isMobileMenuOpen) && (
            <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
              className="text-sm font-medium"
            >
              {item.name}
            </motion.p>
          )}
      </NavLink>
    </motion.div>
  );
}

export default Sidebar;
