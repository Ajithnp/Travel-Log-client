import ProfileEdit from "@/features/user/components/ProfileEdit";
import ChangeEmailModal from "@/components/shared/modal/ChangeEmailModa";
import VerifyOtpModal from "@/components/shared/modal/OtpverifyModal";
import ChangePasswordModal from "@/components/shared/modal/ChangePasswordModal";
import { Loading } from "@/components/ui/loading";
import useVendorProfile from "../hooks/useVendorProfile";
import { useModalManager } from "@/features/user/hooks/useProfileEditModals";
import { useEditProfileOperations } from "@/features/user/hooks/useEditProfileOperations";
import useOtpStorage from "@/features/user/hooks/useOtpStorage";
import { useProfileLogoUpdate } from "../hooks/useProfilePhotoUpload";

const VendorProfileEditContainer = () => {
  const { vendor, vendorQuery, profileLogoUrl } = useVendorProfile();
  
  const { activeModal, openModal, closeModal } = useModalManager();
  const {
    handleEmailChangeRequest,
    isLoadingEmail,
    handleOtpVerification,
    isLoadingOtp,
    handlePasswordChange,
    isLoadingPassword,
    handleProfileUpdate,
    isLoadingProfile,

  } = useEditProfileOperations({ openModal, closeModal });
  
  
  const { uploadProfilePhoto } = useProfileLogoUpdate({userId:vendor?.id || ''});
  
  useOtpStorage({ openModal });
  if (!vendor) return;
  if (!profileLogoUrl || vendorQuery.isLoading)
    <Loading variant="spinner" fullscreen />;

  return (
    <>
      <ProfileEdit
        onEmailChangeClick={() => openModal("email")}
        onPasswordChangeClick={() => openModal("password")}
        onProfileUpdate={handleProfileUpdate}
        user={vendor}
        profileUrl={profileLogoUrl}
        loading={isLoadingProfile}
        onFileSelect={uploadProfilePhoto}
      />

      <ChangeEmailModal
        isOpen={activeModal === "email"}
        onClose={() => closeModal()}
        onSubmit={handleEmailChangeRequest}
        isLoading={isLoadingEmail}
      />

      <VerifyOtpModal
        isOpen={activeModal === "otp"}
        onClose={closeModal}
        onSubmit={handleOtpVerification}
        isLoading={isLoadingOtp}
      />

      <ChangePasswordModal
        isOpen={activeModal === "password"}
        onClose={closeModal}
        onSubmit={handlePasswordChange}
        isLoading={isLoadingPassword}
      />
    </>
  );
};

export default VendorProfileEditContainer;
