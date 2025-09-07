
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { adminSidebarLinks } from "@/types/components-inputs.types/commponents.types"
import Sidebar from "@/components/sidebar"
import { Outlet } from "react-router-dom"



const VendorSidebarLayout = () => {

  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)


  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setIsExpanded(false)
        setIsMobileMenuOpen(false)
      } else {
        setIsExpanded(true)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* sidebar */}
      <Sidebar
       isExpanded={isExpanded}
       setIsExpanded={setIsExpanded}
       isMobile={isMobile}
       isMobileMenuOpen={isMobileMenuOpen}
       setIsMobileMenuOpen={setIsMobileMenuOpen}
       closeMobileMenu={closeMobileMenu}
       sidebarLinks={adminSidebarLinks}
       />

      <div className="flex-1 flex flex-col min-w-0">
        {/* navbar */}
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-border py-3 bg-card">
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 h-8 w-8 md:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center gap-4">
            <h1 className="text-base md:text-lg font-semibold text-foreground truncate">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-5 text-muted-foreground">
            <p className="text-xs md:text-sm hidden sm:block">Hi! Admin</p>
            <Button variant="outline" size="sm" className="text-xs md:text-sm px-2 md:px-3 bg-transparent">
              Logout
            </Button>
          </div>
        </div>



      </div>
    </div>
  )
}

export default VendorSidebarLayout