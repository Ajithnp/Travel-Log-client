import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Archive, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatRoom } from "../../services/api.services";

interface ChatSidebarProps {
  chats: ChatRoom[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  isLoading: boolean;
  currentUserId: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-indigo-500",
];
function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export const ChatSidebar = ({
  chats,
  selectedChatId,
  onSelectChat,
  isLoading,
  currentUserId,
  searchQuery,
  onSearchChange,
}: ChatSidebarProps) => {
  return (
    <div className="flex flex-col overflow-y-auto flex-1">
      {onSearchChange && (
        <div className="px-3 py-2 flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery || ""}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted/40 border border-transparent hover:border-border/60 focus:border-violet-500 focus:bg-background rounded-lg outline-none transition-all placeholder:text-muted-foreground/60"
            />
          </div>
        </div>
      )}

   
      {isLoading ? (
        <div className="flex flex-col p-2 gap-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl">
                <div className="w-9 h-9 rounded-full bg-muted animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 bg-muted animate-pulse rounded-full" />
                  <div className="h-2.5 w-36 bg-muted/60 animate-pulse rounded-full" />
                </div>
              </div>
              {i < 5 && <div className="mx-4 h-px bg-border/40" />}
            </div>
          ))}
        </div>
      ) : chats.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 text-muted-foreground p-6">
          <div className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 opacity-50" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">No chats found</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">
              {searchQuery ? "Try a different search term" : "Your trip conversations appear here"}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1 pb-2">
          <p className="px-4 pt-1 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40 select-none">
            Conversations
          </p>

          {chats.map((chat, idx) => {
            const isSelected = chat.id === selectedChatId;
            const isArchived = chat.status === "archived";
            const isBlocked =
              chat.members.find((m) => m.userId === currentUserId)?.isActive === false;
            const lastMsg = chat.lastMessage;
            const initial = chat.chatName?.[0]?.toUpperCase() ?? "T";
            const color = avatarColor(chat.chatName ?? "T");
            const isLast = idx === chats.length - 1;

            return (
              <div key={chat.id}>
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-2 py-2 mx-2 rounded-xl text-left transition-all duration-150 relative",
                    "w-[calc(100%-16px)]",
                    isSelected
                      ? "bg-violet-50 dark:bg-violet-950/30 border border-violet-200/60 dark:border-violet-800/40"
                      : "border border-transparent hover:bg-muted/100"
                  )}
                >
                  {isSelected && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-500 rounded-r-full" />
                  )}
                  <div
                    className={cn(
                      "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-semibold text-white text-sm",
                      isSelected ? color : "bg-blue-500"
                    )}
                  >
                    {initial}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className={cn(
                          "text-[13px] truncate",
                          isSelected ? "font-semibold text-foreground" : "font-medium text-foreground/90"
                        )}
                      >
                        {chat.chatName ?? "Trip"}
                      </span>
                      {isArchived ? (
                        <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground/70 flex-shrink-0 bg-muted px-1.5 py-0.5 rounded-full">
                          <Archive className="w-2.5 h-2.5" />
                          Archived
                        </span>
                      ) : isBlocked ? (
                        <span className="flex items-center gap-0.5 text-[9px] text-rose-600 flex-shrink-0 bg-rose-50 dark:bg-rose-950/30 px-1.5 py-0.5 rounded-full font-medium">
                          <Lock className="w-2.5 h-2.5" />
                          Blocked
                        </span>
                      ) : lastMsg ? (
                        <span className="text-[10px] text-muted-foreground/50 flex-shrink-0">
                          {formatDistanceToNow(new Date(lastMsg.createdAt), { addSuffix: false })}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className={cn(
                        "text-[11px] truncate leading-snug flex-1",
                        !!chat.unreadCount && chat.unreadCount > 0
                          ? "text-violet-600 dark:text-violet-400 font-medium"
                          : "text-transparent select-none"
                      )}>
                        {!!chat.unreadCount && chat.unreadCount > 0 ? 'New Message': "\u00A0"}
                      </p>
                      {!!chat.unreadCount && chat.unreadCount > 0 && (
                        <div className="flex-shrink-0 bg-violet-600 text-white text-[10px] font-bold px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">
                          {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                        </div>
                      )}
                      <span className="text-xs text-gray-400"> {lastMsg?.content }</span>
                    </div>
                  </div>
                </button>

                {!isLast && !isSelected && chats[idx + 1]?.id !== selectedChatId && (
                  <div className="mx-4 h-px bg-border/40" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};