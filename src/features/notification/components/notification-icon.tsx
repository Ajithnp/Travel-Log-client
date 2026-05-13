import { selectIsAuthenticated } from "@/store/slices/user.slice";
import { Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUnreadCount } from "@/store/slices/notification.slice";

interface Props {
  hasBackground: boolean;
}

export const NavbarNotificationIcon = ({ hasBackground }: Props) => {
  const unreadCount = useSelector(selectUnreadCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) return null;

  return (
    <Link
      to={`/${isAuthenticated.role}/notifications`}
      aria-label={`Notification${unreadCount > 0 ? `, ${unreadCount} items` : ""}`}
      className="relative inline-flex items-center"
    >
      <Bell
        size={24}
        strokeWidth={2}
        className={`transition-colors duration-300 ${
          hasBackground
            ? "text-gray-600 hover:text-orange-500"
            : "text-white/90 hover:text-white"
        }`}
      />

      {unreadCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center px-1 leading-none">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
};
