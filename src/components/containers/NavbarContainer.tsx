import ConfirmDialog from "../shared/modal/ConfirmDialog";
import RegistrationModal from "@/components/shared/modal/RegistrationModal";
import useNavbarScroll from "@/hooks/useNavbarScroll";
import useNavbarAuth from "@/hooks/useNavbarAuth";
import useNavbarModals from "@/hooks/useNavbarModals";
import Navbar from "../shared/navbar";

const NavbarContainer = () => {
  const { isScrolled, location } = useNavbarScroll();
  const { user, isLoading, handleLogout } = useNavbarAuth();
  const {
    confirmLogout,
    setConfirmLogout,
    showRegistrationModal,
    setShowRegistrationModal,
    isMenuOpen,
    setIsMenuOpen,
    handleSelectOption,
  } = useNavbarModals();

  return (
    <>
      <Navbar
        user={user}
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        location={location}
        isLoading={isLoading}
        setConfirmLogout={setConfirmLogout}
        handleLogout={handleLogout}
        setShowRegistrationModal={setShowRegistrationModal}
      />

      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onSelectOption={handleSelectOption}
      />
      {confirmLogout &&
        <ConfirmDialog
          isOpen={confirmLogout}
          onClose={() => setConfirmLogout(false)}
          title="Logout"
          description="Are you sure want to logout"
          onConfirm={handleLogout}
        />
      }

    </>
  );
};

export default NavbarContainer;
