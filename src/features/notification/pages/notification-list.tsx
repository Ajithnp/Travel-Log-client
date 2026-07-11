import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BellOff,
  Filter,
} from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import {
  useDeleteNotificationMutation,
  useMarkAllAsReadMutation,
  useMarkOneAsReadMutation,
  useNotificationQuery,
} from "../hooks/api.hooks";
import { NotificationsPagination } from "../components/notification-pagination";
import { NotificationRow } from "../components/notification-row";
import { NotificationsFilter } from "../components/notification-filter";
import { NotificationsHeader } from "../components/notification-header";
import { selectUnreadCount } from "@/store/slices/notification.slice";
import { useSelector } from "react-redux";
import { useAuthUser } from "@/hooks/useAuthUser";


export type Filter = "All" | "Unread";
export const FILTERS: Filter[] = ["All", "Unread"];
export const FILTER_VALUE_MAP: Record<Filter, boolean | undefined> = {
  All:    undefined,
  Unread: false,
};
const LIMIT = 10;

export default function Notifications() {
  const navigate = useNavigate();
  const role = useAuthUser().user?.role;
  const unreadCount = useSelector(selectUnreadCount);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
 
  const { data, isLoading, isError } = useNotificationQuery(page, LIMIT, FILTER_VALUE_MAP[filter]);
  const markAllMutation = useMarkAllAsReadMutation();
  const markOneMutation = useMarkOneAsReadMutation();
  const deleteMutation = useDeleteNotificationMutation();
 
  const notifications = data?.data?.notifications ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = data?.data?.totalPages ?? 1;

  const handleToggle = (id: string, isRead: boolean) => {
    setExpanded((prev) => (prev === id ? null : id));
    if (expanded !== id && !isRead) {
      markOneMutation.mutate(id);
    }
  };
 
  const handleMarkAllRead = () => {
    markAllMutation.mutate();
  };
 
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteMutation.mutate(id);
    if (expanded === id) setExpanded(null);
  };
 
  const handleCTAClick = (redirectUrl: string | null) => {
    if (redirectUrl) navigate(redirectUrl);
  };
 
  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    setPage(1);
  };
 
  return (
    <div className={clsx("min-h-screen px-4 sm:px-6 py-12 bg-orange-50/30 font-['Inter'] sm:py-8", role === "user" ? "mt-20" : "")}>
      <div className="max-w-[97rem] mx-auto">
 
        <NotificationsHeader
          unread={unreadCount}
          total={total}
          isMarkingAll={markAllMutation.isPending}
          onMarkAllRead={handleMarkAllRead}
        />
 
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.05 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
        >
          {/* <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500" /> */}
 
          <NotificationsFilter
            filter={filter}
            unread={unreadCount}
            onFilterChange={handleFilterChange}
          />
 
          <div className="divide-y divide-gray-50">
            <AnimatePresence initial={false}>
              {isLoading && (
                <div className="flex items-center justify-center py-16">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {isError && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-sm text-red-400">
                    Failed to load notifications.
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Please refresh the page.
                  </p>
                </div>
              )}
 
              {!isLoading && !isError && notifications.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                    <BellOff className="w-5 h-5 text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-400">
                    No notifications here
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Check another filter or come back later
                  </p>
                </motion.div>
              )}
 
              {!isLoading &&
                notifications.map((n) => (
                  <NotificationRow
                    key={n._id}
                    notification={n}
                    isExpanded={expanded === n._id}
                    isDeleting={deleteMutation.isPending}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onCTAClick={handleCTAClick}
                  />
                ))}
            </AnimatePresence>
          </div>
 
          <NotificationsPagination
            page={page}
            totalPages={totalPages}
            total={total}
            showing={notifications.length}
            onPrev={() => setPage((p) => p - 1)}
            onNext={() => setPage((p) => p + 1)}
          />
        </motion.div>
      </div>
    </div>
  );
}