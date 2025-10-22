import React from 'react'
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
interface SidebarHeaderProps {
  title: string;
  greeting?: string;
  onLogout: React.Dispatch<React.SetStateAction<boolean>>;
  onMenuToggle?: () => void;
  isMobile?: boolean;
}
const SidebarHeader = ({
  title,
  greeting,
  onLogout,
  onMenuToggle,
  isMobile
}:SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-border py-3 bg-card">
      {isMobile && onMenuToggle &&(
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
        <h1 className="text-base md:text-lg font-semibold text-foreground truncate">{ title }</h1>
      </div>
      <div className="flex items-center gap-3 md:gap-5 text-muted-foreground">
        <p className="text-xs md:text-sm hidden sm:block">{ greeting }</p>
        <Button
          onClick={() => onLogout(true)}
          variant="outline"
          size="sm"
          className="text-xs md:text-sm px-2 md:px-3 bg-transparent cursor-pointer">
          Logout
        </Button>
      </div>
    </div>
  )
}

export default SidebarHeader
