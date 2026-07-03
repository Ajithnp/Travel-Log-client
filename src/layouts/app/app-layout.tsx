import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import NavbarContainer from "@/components/containers/NavbarContainer";
import { useInitialiseWishlist } from "@/features/user/wishlist/hooks/initialise-wishlist";
import { useNotificationSocket } from "@/features/notification/hooks/notification.socket";
import { ChatWidget } from "@/features/user/chat-bot/components/chat-widget";
import { useAuthUser } from "@/hooks/useAuthUser";

export function MainLayout() {
  useInitialiseWishlist();
  useNotificationSocket();
  const {isLoggedIn} = useAuthUser()
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <NavbarContainer />
      <main><Outlet /></main>
      <Footer />
      {isLoggedIn && <ChatWidget />}
    </div>
  );
}