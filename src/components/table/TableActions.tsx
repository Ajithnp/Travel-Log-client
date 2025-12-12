import { useState } from "react";
import { MoreHorizontal} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
type ActionVariant = "primary" | "success" | "danger" | "info";

export type TableAction = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: ActionVariant
  show?: boolean; // conditional rendering
};

interface TableActionsProps {
  actions: TableAction[];
  
}

export function TableActions({
  actions,
}: TableActionsProps) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
      <div className="flex items-center gap-2">
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 group-hover:shadow-hover transition-smooth cursor-pointer"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-popover border-table-border shadow-dropdown"
        >
          {actions
            .filter((action) => action.show !== false)
            .map((action, i) => (
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2" 
                key={i}
                onSelect={() => {
                  action.onClick();
                  setDropdownOpen(false);
                }}
              >
                {action.icon} {action.label}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
