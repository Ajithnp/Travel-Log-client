import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { vendorSidebarLinks } from "@/types/components-inputs.types/commponents.types";
import Sidebar from "@/components/sidebar";
import { Outlet , useNavigate} from "react-router-dom";
import { useLogoutMutation } from "@/features/auth/hooks/auth.hooks";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { clearVendor } from "@/store/slices/vendor.slice";
import SidebarHeader from "@/components/SidebarHeader";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const VendorSidebarLayout = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const dispatch = useDispatch();
  const { mutate: logout} = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (response) => {
        toast.success(response?.message);
        dispatch(clearVendor());
        navigate('/vendor/login', { replace: true });
        
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || error.message);
      },
    });
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsExpanded(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

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
        sidebarLinks={vendorSidebarLinks}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* navbar */}
        <SidebarHeader
          title="Dashboard"
          greeting="Hii Vendor"
          onLogout={setConfirmLogout}
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobile={isMobile}
        />
      {/* render child component */}
        <Outlet />

      </div>
      <ConfirmDialog
        isOpen={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        title="Are you sure want to Logout"
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default VendorSidebarLayout;
