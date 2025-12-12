import  { useEffect, useState } from "react";
import { useLocation,type Location } from "react-router-dom";

type NavbarScrollResult = {
  isScrolled: boolean;
  location: Location;
};

const useNavbarScroll = ():NavbarScrollResult => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const location = useLocation();
    
        useEffect(() => {
            const isHome = location.pathname === "/";
    
            if (!isHome) {
                setIsScrolled(true);
                return; //don't add scroll listener for non-home pages
            }
    
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 10);
            };
    
            window.addEventListener("scroll", handleScroll);
            handleScroll();
    
            return () => window.removeEventListener("scroll", handleScroll);
        }, [location.pathname]);
    
    return { isScrolled, location };
};

export default useNavbarScroll;
