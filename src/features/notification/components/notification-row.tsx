import { AnimatePresence, motion } from "framer-motion";
import { Bell, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NotificationResponseDTO } from "../services/api.services";


interface NotificationRowProps {
  notification: NotificationResponseDTO
  isExpanded: boolean;
  isDeleting: boolean;
  onToggle: (id: string, isRead: boolean) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  onCTAClick: (redirectUrl: string | null) => void;
}

export function NotificationRow({
  notification: n,
  isExpanded,
  isDeleting,
  onToggle,
  onDelete,
  onCTAClick,
}: NotificationRowProps) {
  return (
    <motion.div
      key={n._id}
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.22 }}
      className={`relative transition-colors duration-200 ${
        isExpanded
          ? "bg-indigo-50/30"
          : n.isRead
            ? "bg-white"
            : "bg-indigo-50/90"
      }`}
    >
      {!n.isRead && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-600 rounded-r-full" />
      )}

      <div className="flex items-start gap-3 px-4 sm:px-5 py-3.5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border bg-indigo-50 border-indigo-100">
          <Bell className="w-4 h-4 text-indigo-500" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-0.5 mb-0.5">
            <div className="flex items-center gap-2">
              <p
                className={`text-sm font-semibold ${n.isRead ? "text-gray-600" : "text-gray-900"}`}
              >
                {n.title}
              </p>
              {!n.isRead && (
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-indigo-600" />
              )}
            </div>
            <span className="text-[11px] text-gray-400 flex-shrink-0">
              {new Date(n.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {n.message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onToggle(n._id, n.isRead)}
            className={`h-7 px-2.5 text-[11px] gap-1 transition-colors ${
              isExpanded
                ? "bg-indigo-100 border-indigo-200 text-indigo-700 hover:bg-indigo-200"
                : "border-gray-200 text-gray-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
            }`}
          >
            <Eye className="w-3 h-3" />
            {isExpanded ? "Close" : "View"}
          </Button>
          <button
            onClick={(e) => onDelete(e, n._id)}
            disabled={isDeleting}
            className="w-6 h-6 rounded-md flex items-center justify-center text-gray-300 hover:text-rose-400 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mx-4 sm:mx-5 mb-4 rounded-xl border border-indigo-100 bg-white shadow-sm overflow-hidden">
              <div className="px-4 py-3.5">
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {n.message}
                </p>

                {/* Extra data fields if present */}
                {n.data && Object.keys(n.data).length > 0 && (
                  <div className="rounded-lg bg-gray-50 border border-gray-100 divide-y divide-gray-100 mb-4">
                    {Object.entries(n.data).map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between px-3 py-2"
                      >
                        <span className="text-[11px] text-gray-400 capitalize">
                          {label.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-700 font-mono">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA → redirectUrl */}
                {n.redirectUrl && (
                  <Button
                    size="sm"
                    onClick={() => onCTAClick(n.redirectUrl)}
                    className="h-8 px-4 text-xs bg-indigo-500 hover:bg-indigo-600 text-white border-0 gap-1.5"
                  >
                    View Details
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}