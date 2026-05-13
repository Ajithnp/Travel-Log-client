import { motion } from "framer-motion";
import { Bell, Check} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationsHeaderProps {
  unread: number;
  total: number;
  isMarkingAll: boolean;
  onMarkAllRead: () => void;
}

export function NotificationsHeader({
  unread,
  total,
  isMarkingAll,
  onMarkAllRead,
}: NotificationsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center relative">
            <Bell className="w-4 h-4 text-indigo-500" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-[9px] text-white font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-md sm:text-2xl font-bold text-gray-900 tracking-tight">
              Notifications
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {unread > 0 ? `${unread} unread · ` : "All caught up · "}
              {total} total
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unread > 0 && (
            <Button
              onClick={onMarkAllRead}
              disabled={isMarkingAll}
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs border-gray-200 text-gray-500 gap-1.5 hover:bg-gray-50"
            >
              <Check className="w-3 h-3" />
              {isMarkingAll ? "Marking..." : "Mark all read"}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}