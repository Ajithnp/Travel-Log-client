import { assets } from "@/assets/asset";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import React from "react";
import { ModeToggle } from "../mode-toggle";
import type { IUser } from "@/types/IUser";
import { NAV_LINKS } from "../fieldsConfig/fields";
import UserAvatar from "../UserAvathar";

interface Location {
  pathname: string;
  state: unknown;
  key: string;
}
interface NavbarProps {
  user: Partial<IUser> | null;
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  location: Location;
  isLoading: boolean;
  setConfirmLogout: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  setShowRegistrationModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({
  user,
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
  location,
  isLoading,
  handleLogout,
  setConfirmLogout,
  setShowRegistrationModal,
}: NavbarProps) => {

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : location.pathname === "/"
          ? "bg-transparent text-white py-4 md:py-6"
          : "bg-white/80 shadow-md text-grey-700 py-3 md:py-4"
      }`}
    >
      {/* Logo */}
      <Link to={"/"}>
        <img
          src={assets.logo2 || "/placeholder.svg"}
          alt="logo"
          className={`h-9 transition-all ${
            isScrolled || location.pathname !== "/" ? "invert opacity-80" : ""
          }`}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`group flex flex-col gap-0.5
               ${
                 isScrolled || location.pathname !== "/"
                   ? "text-gray-700"
                   : "text-white"
               }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled || location.pathname !== "/"
                  ? "bg-gray-700"
                  : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon || "/placeholder.svg"}
          alt="search"
          className={`${
            isScrolled || location.pathname !== "/" ? "invert" : ""
          } h-7 transitions-all duration-500`}
        />

        {user ? (
          <UserAvatar
            user={user}
            isScrolled={isScrolled || location.pathname !== "/"}
            buttonText={isLoading ? "..." : "Logout"}
            onLogout={setConfirmLogout}
          />
        ) : (
          <Button
            onClick={() => setShowRegistrationModal(true)}
            className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all cursor-pointer duration-500"
          >
            Login
          </Button>
        )}

        <ModeToggle />
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserAvatar
            user={user}
            isScrolled={isScrolled || location.pathname !== "/"}
            onLogout={handleLogout}
            buttonText={isLoading ? "..." : "logout"}
          />
        )}
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon || "/placeholder.svg"}
          alt=""
          className={`${
            isScrolled || location.pathname !== "/" ? "invert" : ""
          } h-4`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={assets.closeIcon || "/placeholder.svg"}
            alt="close-menu"
            className="h-6"
          />
        </Button>

        {NAV_LINKS.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </Link>
        ))}

        {!user && (
          <Button
            onClick={() => {}}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
