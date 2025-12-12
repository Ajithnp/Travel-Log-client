import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ConfirmDialog from "@/components/shared/modal/ConfirmDialog";
import SidebarHeader from "@/components/sidebar/SidebarHeader";
import { useLogoutMutation } from "@/features/auth/hooks/api.hooks";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/user.slice";
import type { SidebarLink } from "@/types/components-inputs.types/commponents.types";

interface SidebarLayoutProps {
  sidebarLinks: SidebarLink[];
  dashboardTitle: string;
  greeting: string;
  loginRedirectPath: string;
}

export default function SidebarLayout({
  sidebarLinks,
  dashboardTitle,
  greeting,
  loginRedirectPath,
}: SidebarLayoutProps) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: logout } = useLogoutMutation();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [confirmLogout, setConfirmLogout] = useState<boolean>(false);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        toast.success(res.message);
        dispatch(clearUser());
        navigate(loginRedirectPath, { replace: true });
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || err.message);
      },
    });
  };

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsExpanded(true);
      }
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const closeMobileMenu = () => {
    if (isMobile) setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      <Sidebar
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
        sidebarLinks={sidebarLinks}
        onLogout={() => setConfirmLogout(true)}
      />

      {/* <div className="flex-1 flex flex-col overflow-hidden"> */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">

        <SidebarHeader
          title={dashboardTitle}
          greeting={greeting}
          isMobile={isMobile}
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onLogout={() => setConfirmLogout(true)}
        />
        
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

      </div>

      {confirmLogout && (
        <ConfirmDialog
          isOpen={confirmLogout}
          onClose={() => setConfirmLogout(false)}
          title="Are you sure want to Logout"
          onConfirm={handleLogout}
        />
      )}

    </div>
  );
}


