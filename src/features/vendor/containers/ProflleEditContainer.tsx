import ProfileEdit from "@/features/user/components/ProfileEdit";
import VerifyOtpModal from "@/components/shared/modal/OtpverifyModal";
import useVendorProfile from "../hooks/useVendorProfile";
import { useModalManager } from "@/features/user/hooks/useProfileEditModals";
import { useEditProfileOperations } from "@/features/user/hooks/useEditProfileOperations";
import useOtpStorage from "@/features/user/hooks/useOtpStorage";
import { useProfileLogoUpdate } from "../hooks/useProfilePhotoUpload";
import FieldModal from "@/components/shared/modal/FieldModal";
import { SpinnerLoading } from "@/components/common/spinner";
import { Mail, ShieldCheck } from "lucide-react";
import { emailFields, passwordFields } from "@/types/components-inputs.types/commponents.types";

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


  const { uploadProfilePhoto } = useProfileLogoUpdate({ userId: vendor?.id || '' });

  useOtpStorage({ openModal });
  if (!vendor) return;
  if (!profileLogoUrl || vendorQuery.isLoading)
    <SpinnerLoading title="Loading.." />;

  return (
    <>
      <ProfileEdit
        onEmailChangeClick={() => openModal("email")}
        onPasswordChangeClick={() => openModal("password")}
        onProfileUpdate={handleProfileUpdate}
        user={vendor}
        profileUrl={profileLogoUrl?.url}
        loading={isLoadingProfile}
        onFileSelect={uploadProfilePhoto}
      />

      <FieldModal
        isOpen={activeModal === "email"}
        onClose={() => closeModal()}
        title="Change Email"
        description="Enter a new email address for your account."
        icon={<Mail className="w-5 h-5 text-white" />}
        iconBg="from-orange-500 to-indigo-500"
        fields={emailFields}
        submitLabel="Update Email"
        isLoading={isLoadingEmail}
        onSubmit={(data) => handleEmailChangeRequest(data.email)}
      />

      <VerifyOtpModal
        isOpen={activeModal === "otp"}
        onClose={closeModal}
        onSubmit={handleOtpVerification}
        isLoading={isLoadingOtp}
      />

      <FieldModal
        isOpen={activeModal === "password"}
        onClose={closeModal}
        title="Change Password"
        description="Keep your account safe with a strong password."
        icon={<ShieldCheck className="w-5 h-5 text-white" />}
        iconBg="from-orange-500 to-blue-600"
        fields={passwordFields}
        submitLabel="Update Password"
        isLoading={isLoadingPassword}
        onSubmit={(data) =>
          handlePasswordChange(data.newPassword, data.oldPassword)
        }
      />
    </>
  );
};

export default VendorProfileEditContainer;
