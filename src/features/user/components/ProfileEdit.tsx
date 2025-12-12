import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IUser } from "@/types/IUser";
import ConfirmDialog from "@/components/shared/modal/ConfirmDialog";
import { Loading } from "@/components/ui/loading";
import type { IVendorInfo } from "@/types/IVendorInfo";
import { Upload } from "lucide-react";
import { ROLE } from "@/types/Role";
import useUpdateProfileLogo from "../hooks/useUpdateProfileLogo";
import {
  item,
  container,
} from "@/features/vendor/animations/vendorProfile.animations";
import useProfileUpdate from "../hooks/useProfileUpdate";
import ProfileForm from "./ProfileForm";

interface ProfileEditProps {
  onEmailChangeClick: () => void;
  onPasswordChangeClick: () => void;
  onProfileUpdate: (data: Partial<IUser>) => void;
  user: Partial<IVendorInfo>;
  loading?: boolean;
  onFileSelect?: (file: File ) => Promise<void>;
  profileUrl?: string;
}

const ProfileEdit = ({
  onEmailChangeClick,
  onPasswordChangeClick,
  onProfileUpdate,
  onFileSelect,
  user,
  loading,
  profileUrl,
}: ProfileEditProps) => {
  const { showConfirm, prepareUpdate, confirmUpdate, closeConfirm } =
    useProfileUpdate({ user, onProfileUpdate });

  const {
    fileInputRef,
    preview,
    handleFileChange,
    cancelPreview,
    uploadProfileImage,
  } = useUpdateProfileLogo({ onFileSelect });

  if (loading) {
    <Loading variant="spinner" text="updating" fullscreen />;
  }

  if (!user) {
    return;
  }
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-pretty text-3xl font-semibold tracking-tight md:text-4xl">
            Profile
          </h1>
          <p className="text-muted-foreground mt-2 max-w-prose">
            Manage your account information and preferences
          </p>
        </div>
      </header>

      <motion.section
        className={cn("grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch")}
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Left: Summary Card */}
        <motion.div variants={item}>
          <Card className="rounded-xl border border-border p-6 h-full flex items-center justify-center">
            <div className="flex flex-col items-center text-center relative">
              <div className="relative mb-4">
                <Avatar className="size-24">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-full">
                      <span className="text-gray-500 text-sm">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <AvatarImage
                        src={preview || profileUrl}
                        alt="Vendor Avatar"
                        className="transition-opacity duration-300"
                      />
                      <AvatarFallback className="text-lg">
                        {user?.name?.[0]}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                {user.role === ROLE.VENDOR && (
                  <>
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-1 right-1 flex items-center justify-center w-7 h-7 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-gray-700" />
                    </Button>

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              <div className="text-lg font-medium">{""}</div>

              <div className="mt-6 w-full space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <span
                    aria-hidden
                    className="inline-block size-5 rounded-full border border-border"
                  />
                  <span className="truncate">{user.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span
                    aria-hidden
                    className="inline-block size-5 rounded-full border border-border"
                  />
                  <span className="truncate">{user.email}</span>
                  {/* user.name */}
                </div>
              </div>

              {preview && (
                <div className="mt-6 flex gap-3">
                  <Button
                    variant="default"
                    className="cursor-pointer"
                    onClick={uploadProfileImage}
                  >
                    {loading ? (
                      <Loading variant="spinner" text="loading.." />
                    ) : (
                      "Update Profile Photo"
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={cancelPreview}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Right: Form Card */}
        <ProfileForm
          user={user}
          onEmailChangeClick={onEmailChangeClick}
          onPasswordChangeClick={onPasswordChangeClick}
          prepareUpdate={prepareUpdate}
        />
      </motion.section>

      {/* Confirmation Modal */}

      {showConfirm && (
        <ConfirmDialog
          isOpen={showConfirm}
          onClose={closeConfirm}
          title="Confirm Changes"
          description="Are you sure you want to update your profile details"
          onConfirm={confirmUpdate}
        />
      )}
    </main>
  );
};

export default ProfileEdit;
