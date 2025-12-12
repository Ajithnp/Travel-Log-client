import ProfileEdit from "@/features/user/components/ProfileEdit";
import ChangeEmailModal from "@/components/shared/modal/ChangeEmailModa";
import VerifyOtpModal from "@/components/shared/modal/OtpverifyModal";
import ChangePasswordModal from "@/components/shared/modal/ChangePasswordModal";
import { Loading } from "@/components/ui/loading";
import { useUserProfileQuery } from "@/features/user/hooks/api.hooks";
import { useModalManager } from "../hooks/useProfileEditModals";
import { useEditProfileOperations } from "../hooks/useEditProfileOperations";
import useOtpStorage from "../hooks/useOtpStorage";

const UserProfileContainer = () => {
  const { data, isLoading } = useUserProfileQuery();

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
  
  useOtpStorage({ openModal });

  if (isLoading || !data?.data) {
    return <Loading variant="spinner" fullscreen />;
  }
  const profileData = data?.data;

  return (
    <>
      <ProfileEdit
        onEmailChangeClick={() => openModal("email")}
        onPasswordChangeClick={() => openModal("password")}
        onProfileUpdate={handleProfileUpdate}
        user={profileData}
        loading={isLoadingProfile}
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

export default UserProfileContainer;
