import Profile from "../components/Profile";
import { useUserProfileQuery } from "../hooks/api.hooks";
import { motion } from "framer-motion";
import { SpinnerLoading } from "@/components/common/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { data, isLoading } = useUserProfileQuery();
  const userData = data?.data;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-accent backdrop-blur-xl border-slate-200/60 p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="px-6 py-4 bg-slate-100/80 border-b border-slate-100 sticky top-0 z-10 backdrop-blur-md">
          <DialogTitle className="text-xl font-bold text-slate-800">Your Profile</DialogTitle>
          <DialogDescription className="text-slate-500">
            View and manage your account details
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <SpinnerLoading title="loading.." />
            </div>
          ) : !userData ? (
            <div className="text-center p-8 text-slate-500">
              Profile data not found.
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Profile user={userData} />
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
