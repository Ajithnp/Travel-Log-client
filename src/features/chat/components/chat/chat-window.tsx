import { useEffect, useRef, useState } from "react";
import {
  Send,
  Pin,
  X,
  Eye,
  Archive,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "./chat-message";
import type { Message, ChatRoom } from "../../services/api.services";
import { ConfirmDialogForChat, MembersPanel } from "./members-panel";
import { useMemo } from "react";
import { buildRenderList } from "@/utils/chat/chat.utils";

interface ChatWindowProps {
  chat: ChatRoom;
  messages: Message[];
  isLoading: boolean;
  currentUserId: string;
  isSending: boolean;
  onSendText: (content: string) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onPinMessage?: (message: string) => void;
  onArchive?: () => void;
  onRemoveMember?: (memberId: string) => void;
}

export const ChatWindow = ({
  chat,
  messages,
  isLoading,
  currentUserId,
  isSending,
  onSendText,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  onPinMessage,
  onArchive,
  onRemoveMember,
}: ChatWindowProps) => {
  const [text, setText] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinText, setPinText] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);

  const renderList = useMemo(() => buildRenderList(messages), [messages]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const prevMessageCountRef = useRef(0);

  const scrollHeightBeforeFetchRef = useRef(0);
  const lastScrollTopRef = useRef(0);

  const isArchived = chat.status === "archived";
  const isVendorView = !!(onPinMessage || onArchive || onRemoveMember);
  const isBlocked =
    !isVendorView &&
    chat.members.find((m) => m.userId === currentUserId)?.isActive === false;

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || isLoading) return;

    const newCount = messages.length;
    const prevCount = prevMessageCountRef.current;

    if (newCount === 0) {
      prevMessageCountRef.current = 0;
      return;
    }

    if (prevCount === 0) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    } else if (newCount > prevCount) {
      const addedCount = newCount - prevCount;
      if (addedCount > 1) {
        requestAnimationFrame(() => {
          el.scrollTop = el.scrollHeight - scrollHeightBeforeFetchRef.current;
        });
      } else {
        requestAnimationFrame(() => {
          el.scrollTop = el.scrollHeight;
        });
      }
    }

    prevMessageCountRef.current = newCount;
  }, [messages, isLoading]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onScroll = () => {
      const currentScrollTop = el.scrollTop;
      const isScrollingUp = currentScrollTop < lastScrollTopRef.current;
      lastScrollTopRef.current = currentScrollTop;

      if (
        isScrollingUp &&
        currentScrollTop < 80 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        scrollHeightBeforeFetchRef.current = el.scrollHeight;
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSendText = () => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    onSendText(trimmed);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  const handlePin = () => {
    const trimmed = pinText.trim();
    if (!trimmed) return;
    onPinMessage?.(trimmed);
    setPinText("");
    setShowPinInput(false);
  };

  return (
    <div className="flex flex-col h-full relative bg-background">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-background/95 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {`${chat.chatName?.[0]?.toUpperCase()}` || "T"}
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-[13px] text-foreground leading-tight truncate">
              {`${chat.chatName ? chat.chatName + " (Group Chat)" : `Trip Chat`}`}
            </h2>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              {chat.members.length} members
              {isArchived && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-[9px] font-semibold">
                  Archived
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Vendor-only actions */}
        {isVendorView && (
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMembers((v) => !v)}
              className={`w-8 h-8 rounded-lg transition-colors ${
                showMembers
                  ? "bg-violet-100 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
              }`}
              title="View members"
            >
              <Eye className="w-4 h-4" />
            </Button>

            {onPinMessage && !isArchived && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPinInput((v) => !v)}
                className="h-8 px-2.5 gap-1.5 rounded-lg text-[12px] text-muted-foreground hover:text-foreground hover:bg-muted/70"
              >
                <Pin className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pin</span>
              </Button>
            )}

            {onArchive && !isArchived && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmArchive(true)}
                className="h-8 px-2.5 gap-1.5 rounded-lg text-[12px] text-muted-foreground hover:text-foreground hover:bg-muted/70"
              >
                <Archive className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Archive</span>
              </Button>
            )}
          </div>
        )}
      </div>

      {/*  Pinned message bar */}
      {chat.pinnedMessage && (
        <div className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-indigo-50/80 to-violet-50/80 dark:from-indigo-950/30 dark:to-violet-950/30 border-b border-violet-100 dark:border-violet-900/50 flex-shrink-0 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-violet-200/50 dark:bg-violet-800/30 rounded-full blur-2xl pointer-events-none" />

          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white dark:bg-violet-900/50 flex items-center justify-center shadow-sm border border-violet-100 dark:border-violet-800/50 z-10">
            <Pin className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="flex-1 min-w-0 z-10">
            <p className="text-[10px] font-bold tracking-wider uppercase text-violet-600 dark:text-violet-400 mb-0.5">
              Pinned Announcement
            </p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
              {chat.pinnedMessage}
            </p>
          </div>
        </div>
      )}

      {showPinInput && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/60 bg-muted/30 flex-shrink-0">
          <Pin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          <input
            autoFocus
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground/60"
            placeholder="Type an announcement to pin…"
            value={pinText}
            onChange={(e) => setPinText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePin();
              if (e.key === "Escape") setShowPinInput(false);
            }}
          />
          <Button
            size="sm"
            variant="default"
            onClick={handlePin}
            className="h-7 text-xs rounded-lg px-3"
          >
            Pin
          </Button>
          <button
            onClick={() => setShowPinInput(false)}
            className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 flex flex-col gap-3 min-h-0 scroll-smooth"
      >
        {isLoading ? (
          <div className="flex flex-col gap-4 pt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  i % 2 === 0 ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {i % 2 !== 0 && (
                  <div className="w-8 h-8 rounded-full bg-muted animate-pulse flex-shrink-0" />
                )}
                <div
                  className={`rounded-2xl bg-muted animate-pulse ${
                    i % 2 === 0
                      ? "rounded-br-md w-40 h-9"
                      : "rounded-bl-md w-52 h-10"
                  }`}
                />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground select-none">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-950/30 dark:to-indigo-950/30 flex items-center justify-center shadow-sm">
              <MessageSquare className="w-7 h-7 text-violet-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground/70">
                No messages yet
              </p>
              <p className="text-xs text-muted-foreground/50 mt-0.5">
                Be the first to say something!
              </p>
            </div>
          </div>
        ) : (
          <>
            {!hasNextPage && messages.length > 0 && (
              <div className="flex items-center gap-3 py-2 select-none">
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-[10px] text-muted-foreground/40 font-medium px-2">
                  Beginning of conversation
                </span>
                <div className="flex-1 h-px bg-border/50" />
              </div>
            )}

            {/* Older-page loading indicator */}
            {isFetchingNextPage && (
              <div className="flex items-center justify-center gap-2 py-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-500" />
                <span className="text-[11px] text-muted-foreground/60">
                  Loading older messages…
                </span>
              </div>
            )}

            {renderList.map((item) =>
              item.type === "divider" ? (
                // Day divider
                <div
                  key={`divider-${item.label}`}
                  className="flex items-center gap-3 py-1 select-none sticky top-2 z-10"
                >
                  <div className="flex-1 h-px bg-border/40" />
                  <span className="text-[10px] font-semibold text-muted-foreground/50 bg-background px-2.5 py-1 rounded-full border border-border/40">
                    {item.label}
                  </span>
                  <div className="flex-1 h-px bg-border/40" />
                </div>
              ) : (
                <ChatMessage
                  key={item.data.id}
                  message={item.data}
                  currentUserId={currentUserId}
                />
              ),
            )}
          </>
        )}
      </div>

      {isArchived ? (
        <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-border/60 bg-amber-50/60 dark:bg-amber-950/10 flex-shrink-0">
          <Archive className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            This chat is archived — messages are read-only.
          </p>
        </div>
      ) : isBlocked ? (
        <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-border/60 bg-rose-50/60 dark:bg-rose-950/10 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
          <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
            Vendor blocked you — you can no longer send messages.
          </p>
        </div>
      ) : (
        <div className="flex items-end gap-2 px-3 sm:px-4 py-3 border-t border-border/60 bg-background flex-shrink-0">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message…"
            rows={1}
            className="flex-1 resize-none min-h-[40px] max-h-[120px] text-sm rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors placeholder:text-muted-foreground/50"
          />
          <Button
            size="icon"
            onClick={handleSendText}
            disabled={!text.trim() || isSending}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 transition-all shadow-sm"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}

      {/* Members slide-over panel */}
      {showMembers && (
        <MembersPanel
          chatId={chat.id}
          onClose={() => setShowMembers(false)}
          onRemoveMember={onRemoveMember}
        />
      )}

      {/* Archive confirm dialog */}
      {confirmArchive && (
        <ConfirmDialogForChat
          title="Archive this chat?"
          description="Members will no longer be able to send messages. You can still read the conversation history."
          confirmLabel="Archive"
          onConfirm={() => {
            onArchive?.();
            setConfirmArchive(false);
          }}
          onCancel={() => setConfirmArchive(false)}
        />
      )}
    </div>
  );
};
