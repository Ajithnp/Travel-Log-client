
import { useEffect, useState } from "react"
import { assets } from "@/assets/asset"
import { Link, useLocation, useNavigate } from "react-router-dom"
import RegistrationModal from "@/features/auth/components/RegistrationModal"
import { Button } from "../ui/button"
import { removeStorageItem, setStorageItem } from "@/utils/utils"
import { useSelector, useDispatch } from "react-redux"
import { type RootState } from "@/store/store"
import { useLogoutMutation } from "@/features/auth/hooks/auth.hooks"
import { ModeToggle } from "../mode-toggle";
import { toast } from "sonner"
import { clearUser } from "@/store/slices/user.slice"
import type { IUser } from "@/types/IUser"
import { ConfirmDialog } from "../ConfirmDialog"

export type UserRole = "traveler" | "business"


const UserAvatar = ({ user, isScrolled, onLogout, buttonText }: { user: IUser; buttonText: string; isScrolled: boolean; onLogout: React.Dispatch<React.SetStateAction<boolean>>; }) => {
  const [showLogout, setShowLogout] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="relative" onMouseEnter={() => setShowLogout(true)} onMouseLeave={() => setShowLogout(false)}>
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer transition-all duration-300 ${isScrolled ? "bg-gray-100 hover:bg-gray-200" : "bg-white/20 hover:bg-white/30"
          }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${isScrolled ? "bg-black text-white" : "bg-white text-black"
            }`}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        {/* <img
          src={assets.logo2 || "/placeholder.svg"}
          alt="logo"
          className={`h-5 ${isScrolled ? "invert opacity-80" : ""}`}
        /> */}
      </div>


      {showLogout && (
        <div className="absolute top-full right-0 pt-1 z-50">
          <div className="bg-white rounded-lg shadow-lg border py-2 min-w-[120px]">
            <button
              onClick={() => onLogout(true)}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              {buttonText}
            </button>
            <button
              onClick={() => navigate('/user/dashboard')}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Account
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation()
  const [confirmLogout, setConfirmLogout] = useState(false)

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Trips", path: "/trips" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ]
  // const fixedRoutes = ['/user/dashboard']
  // const isFixed = fixedRoutes.includes(location.pathname);

  const user = useSelector((state: RootState) => state.user.user);


  // state for modal
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleselectOption = (option: UserRole) => {

    if (option === "traveler") {
      setStorageItem("role", "user")
      return navigate("/user/login")
    }
    if (option === "business") {
      setStorageItem("role", "vendor")
      return navigate("/vendor/auth/enter")
    }
    setIsOpen(false)
  }

  const { mutate: logout, isPending: isLoading } = useLogoutMutation();
  const handleLogout = () => {
    logout(
      undefined,
      {
        onSuccess: (response) => {
          toast.success(response?.message);
          dispatch(clearUser())
          removeStorageItem('role')
        },

        onError: (error) => {
          toast.error(error?.response?.data?.message || error.message)
        }
      }
    )
  }

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev))
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location.pathname])

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}
    >
      {/* Logo */}
      <Link to={"/"}>
        <img
          src={assets.logo2 || "/placeholder.svg"}
          alt="logo"
          className={`h-9 ${isScrolled && "invert opacity-80"}`}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}
          >
            {link.name}
            <div
              className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </a>
        ))}

      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon || "/placeholder.svg"}
          alt="search"
          className={`${isScrolled && "invert"} h-7 transitions-all duration-500`}
        />

        {user ? (
          <UserAvatar
            user={user}
            isScrolled={isScrolled}
            buttonText={isLoading ? '...' : 'Logout'}
            onLogout={setConfirmLogout} />
        ) : (
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all cursor-pointer duration-500"
          >
            Login
          </Button>
        )}

        <ModeToggle />

      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {user && <UserAvatar user={user} isScrolled={isScrolled} onLogout={handleLogout} buttonText={isLoading ? '...' : 'logout'} />}
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon || "/placeholder.svg"}
          alt=""
          className={`${isScrolled && "invert"} h-4`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
          <img src={assets.closeIcon || "/placeholder.svg"} alt="close-menu" className="h-6" />
        </button>
        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        {!user && (
          <button
            onClick={() => { }}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <RegistrationModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSelectOption={handleselectOption} />
      )}

      {/* logout confirm dialog */}
      <ConfirmDialog
        isOpen={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        title={'Are you sure want to logout'}
        onConfirm={handleLogout}
      />
    </nav>
  )
}

export default Navbar

