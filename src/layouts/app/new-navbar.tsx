import { useState, useEffect } from "react";
import { Plane, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "@/components/fieldsConfig/fields";
import type { IUser } from "@/types/IUser";
import UserAvathar from "@/components/UserAvathar";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  user: Partial<IUser> | null;
  isLoading: boolean;
  setConfirmLogout: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRegistrationModal: React.Dispatch<React.SetStateAction<boolean>>;
}


export function Navbar({
  user,
  isLoading,
  setConfirmLogout,
  setShowRegistrationModal }: NavbarProps) {

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
   const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
   const hasBackground = isScrolled || !isHomePage;
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${hasBackground
        ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 p-2 rounded-full text-white">
            <Plane className="h-5 w-5" />
          </div>
          <span
            className={`text-2xl font-bold tracking-tight ${hasBackground ? "text-gray-900" : "text-white"
              }`}
          >
            Travels
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`text-sm font-medium transition-all duration-300 relative ${hasBackground
                ? "text-gray-600 hover:text-orange-500"
                : "text-white/90 hover:text-white"
                } ${link.name === "Home"
                  ? "text-orange-400 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-orange-500"
                  : ""
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">

          {user ? (
            <UserAvathar
              user={user}
              isScrolled={isScrolled || location.pathname !== "/"}
              buttonText={isLoading ? "..." : "Logout"}
              onLogout={setConfirmLogout}
            />
          ) : (
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white border-0 rounded-full pl-6 pr-4 shadow-lg hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-0.5 group flex items-center gap-2"
              onClick={() => setShowRegistrationModal(true)}
            >
              Get Started
              <span className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          )}
        </div>

        <button
          className={`lg:hidden p-2 ${hasBackground ? "text-gray-900" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out 
          ${mobileMenuOpen
            ? "max-h-screen py-6 px-6 opacity-100"
            : "max-h-0 py-0 px-6 opacity-0"
          }`}
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`text-gray-800 font-medium text-lg hover:text-orange-500 py-2 border-b border-gray-100 ${link.name === "Home" ? "text-orange-500 font-bold" : ""
              }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}

        {user ? (

          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
            <div className="flex items-center gap-3 px-2 py-2 bg-gray-50 rounded-full">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium">{user.name}</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = "/user/dashboard";
              }}
              className="w-full px-4 py-2 text-left text-orange-600 hover:bg-gray-800 rounded-lg"
            >
              Account
            </button>

            <button

              onClick={() => {
                setMobileMenuOpen(false);
                setConfirmLogout(true);
              }}
              className="w-full px-4 py-2 text-left text-orange-600 hover:bg-gray-800 rounded-lg"
            >
              {isLoading ? "..." : "Logout"}
            </button>
          </div>

        ) : (
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-4 rounded-full flex items-center justify-center gap-2"
            onClick={() => { setShowRegistrationModal(true); setMobileMenuOpen(false); }}
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
        )}

      </div>
    </nav>
  );
}