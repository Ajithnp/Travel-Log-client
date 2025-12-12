
import type { IUser } from "@/types/IUser";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAvatar = ({
  user,
  isScrolled,
  onLogout,
  buttonText,
}: {
  user: Partial<IUser>;
  buttonText: string;
  isScrolled: boolean;
  onLogout: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowLogout(true)}
      onMouseLeave={() => setShowLogout(false)}
    >
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer transition-all duration-300 ${
          isScrolled
            ? "bg-gray-100 hover:bg-gray-200"
            : "bg-white/20 hover:bg-white/30"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            isScrolled ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          {user.name?.charAt(0).toUpperCase()}
        </div>
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
              onClick={() => navigate("/user/dashboard")}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(UserAvatar);