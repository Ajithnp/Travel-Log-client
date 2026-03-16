import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import NavbarContainer from "@/components/containers/NavbarContainer";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
     <NavbarContainer />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}