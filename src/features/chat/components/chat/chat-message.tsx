import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Message } from "../../services/api.services";

interface ChatMessageProps {
  message: Message;
  currentUserId: string;
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

export const ChatMessage = ({ message, currentUserId }: ChatMessageProps) => {
  const isMine = message.senderId === currentUserId;
  const initials = message.senderName
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "?";

  return (
    <div
      className={cn(
        "flex items-end gap-2 group",
        isMine ? "flex-row-reverse" : "flex-row"
      )}
    >
     
      {!isMine && (
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-[11px] self-end mb-1",
            avatarColor(message.senderName)
          )}
        >
          {initials}
        </div>
      )}

    
      <div
        className={cn(
          "flex flex-col gap-0.5 max-w-[72%] sm:max-w-[60%]",
          isMine ? "items-end" : "items-start"
        )}
      >
        {!isMine && (
          <div className="flex items-center gap-1.5 px-1">
            <span className="text-[11px] font-semibold text-foreground/80 leading-none">
              {message.senderName}
            </span>
            {message.senderRole === "vendor" && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 leading-none">
                Vendor
              </span>
            )}
          </div>
        )}

        
        <div
          className={cn(
            "relative px-3.5 py-2.5 text-sm leading-relaxed break-words shadow-sm",
            isMine
              ? "bg-violet-600 text-white rounded-2xl rounded-br-md"
              : "bg-muted/70 text-foreground rounded-2xl rounded-bl-md border border-border/40"
          )}
        >
          {message.content}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-muted-foreground/50 px-1 select-none tabular-nums">
          {format(new Date(message.createdAt), "hh:mm a")}
        </span>
      </div>
    </div>
  );
};
