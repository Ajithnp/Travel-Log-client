import React from 'react'
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { IUserSlice } from '@/store/slices/user.slice';
interface SidebarHeaderProps {
  title: string;
  greeting?: string;
  onMenuToggle?: () => void;
  isMobile?: boolean;
  user?: IUserSlice | null
  onLogout: React.Dispatch<React.SetStateAction<boolean>>;

}
const SidebarHeader = ({
  title,
  greeting,
  onMenuToggle,
  isMobile,
  user,
  onLogout,
}: SidebarHeaderProps) => {
  return (
    <div className=" flex items-center justify-between px-5 md:px-8 border-b border-border py-4 bg-card">
      {isMobile && onMenuToggle && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="p-2 h-8 w-8 md:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}
      <div className="flex items-center gap-4">
        <h1 className="text-base md:text-lg font-semibold text-foreground truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-3 md:gap-5 text-muted-foreground">
        <p className="text-xs md:text-sm hidden sm:block">{greeting}</p>
        {user && (
          <Avatar>
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onLogout(true)}
          className="text-xs md:text-sm px-2 md:px-3 bg-transparent cursor-pointer">
          Logout
        </Button>

      </div>
    </div>
  )
}

export default SidebarHeader
