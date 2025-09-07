import { motion } from "framer-motion"
import type React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, LogOut, Menu, X } from "lucide-react";
import type{ SidebarLink } from "@/types/components-inputs.types/commponents.types";

interface SideBarProps {
  isExpanded: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  closeMobileMenu: () => void
  sidebarLinks: SidebarLink[]
}

const Sidebar = ({
  isExpanded,
  setIsExpanded,
  isMobile,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  closeMobileMenu,
  sidebarLinks
}:SideBarProps) => {

  return (

    <motion.div
      initial={false}
      animate={{
        width: isMobile ? (isMobileMenuOpen ? 256 : 0) : isExpanded ? 256 : 64,
        x: isMobile && !isMobileMenuOpen ? -256 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`border-r border-border bg-sidebar flex flex-col relative shadow-lg
          ${isMobile ? "fixed left-0 top-0 h-full z-50" : "relative"}
          ${isMobile && !isMobileMenuOpen ? "pointer-events-none" : ""}
        `}
    >
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-sidebar-border bg-gradient-to-r from-sidebar to-sidebar/95">
        {(isExpanded || isMobileMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <img
              className="h-6 md:h-8 drop-shadow-sm"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
              alt="Logo"
            />
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (isMobile) {
              setIsMobileMenuOpen(!isMobileMenuOpen)
            } else {
              setIsExpanded(!isExpanded)
            }
          }}
          className="ml-auto p-2 h-8 w-8 hover:bg-sidebar-accent hover:scale-105 transition-all duration-200 rounded-lg"
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

      {/* navbar items(sidebar) */}
      <nav className="flex-1 pt-4 md:pt-6 px-2">
        {sidebarLinks.map((item, index) => (
          <motion.a
            href={item.path}
            key={index}
            onClick={closeMobileMenu}
            className={`flex items-center py-2.5 md:py-3 px-3 gap-3 transition-all duration-200 rounded-xl mb-2 group touch-manipulation
                ${index === 0
                ? "border-r-4 bg-gradient-to-r from-sidebar-primary/15 to-sidebar-primary/5 border-sidebar-primary text-sidebar-primary shadow-sm"
                : "hover:bg-sidebar-accent text-sidebar-foreground hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              }`}
            whileHover={{ x: isExpanded || isMobileMenuOpen ? 4 : 0 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200 w-6 h-6 flex items-center justify-center">
              <item.icon className="w-6 h-6"/>
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
          </motion.a>
        ))}
      </nav>


      <div className="p-3 md:p-4 border-t border-sidebar-border bg-gradient-to-t from-sidebar/50 to-transparent">
        <motion.button
          onClick={() => {
            console.log("Logout clicked")
            closeMobileMenu()
          }}
          className={`flex items-center gap-3 w-full py-2.5 md:py-3 px-3 rounded-xl transition-all duration-200 
              text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 
              hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group border border-transparent hover:border-red-200 dark:hover:border-red-800 touch-manipulation`}
          whileHover={{ x: isExpanded || isMobileMenuOpen ? 4 : 0 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <LogOut className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
          {(isExpanded || isMobileMenuOpen) && (
            <motion.span
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

  )
}

export default Sidebar