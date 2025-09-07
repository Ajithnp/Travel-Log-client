import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Menu, 
  X,
  Bell,
  Search,
  Settings,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarNav } from "@/components/shared/sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import { adminNavItems } from "@/components/components-inputs/sidebar.inputs";

const AdminLayout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Close sidebar on mobile by default and when screen size changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const sidebarWidth = sidebarOpen ? "280px" : "80px";
  const contentMargin = isMobile ? "0px" : (sidebarOpen ? "280px" : "80px");

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed left-0 top-0 h-full bg-gradient-card border-r border-border/50 z-50 overflow-hidden ${
          isMobile ? 'shadow-2xl' : ''
        }`}
        animate={{ 
          width: sidebarWidth,
          x: isMobile && !sidebarOpen ? '-100%' : '0%'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <LayoutDashboard className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      AdminPro
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-muted/50"
              >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          {/* <SidebarNav isCollapsed={!sidebarOpen}, navItems={adminNavItems} /> */}
          <SidebarNav 
             isCollapsed={!sidebarOpen} 
             navItems={adminNavItems}
             />


          {/* User Profile */}
          <div className="p-4 border-t border-border/50 mt-auto">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/avatars/admin.jpg" />
                <AvatarFallback className="bg-gradient-primary text-white">A</AvatarFallback>
              </Avatar>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1"
                  >
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@company.com</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main 
        className="min-h-screen"
        animate={{ marginLeft: contentMargin }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Top Bar */}
        <header className="h-16 bg-card/30 backdrop-blur-xl border-b border-border/50 px-4 lg:px-6 flex items-center justify-between">
          {/* Mobile menu button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden mr-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search anything..." 
                className="pl-10 bg-muted/20 border-border/50 focus:bg-card/60 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Button variant="ghost" size="sm" className="relative hidden sm:flex">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/avatars/admin.jpg" />
              <AvatarFallback className="bg-gradient-primary text-white">A</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default AdminLayout;