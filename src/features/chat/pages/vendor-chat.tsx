import { useEffect, useRef, useState } from "react";
import { MessageSquare, LayoutList, Inbox, Archive, ChevronLeft, Menu } from "lucide-react";
import {
  useArchiveChat,
  useMarkChatAsReadForVendor,
  usePinMessage,
  useRemoveMember,
  useVendorChatMessages,
  useVendorChats,
  vendorChatKeys,
} from "../hooks/api.hooks";
import { useAuthUser } from "@/hooks/useAuthUser";
import { ChatSidebar } from "../components/chat/chat-sidebar";
import { ChatWindow } from "../components/chat/chat-window";
import { CHAT_EVENTS, useChatSocket } from "../hooks/chat-socket";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { Error } from "@/components/common/error";
import { connectWS } from "@/config/socket/socket.config";
import type { Socket } from "socket.io-client";

const STATUS_TABS = [
  { label: "All", value: undefined, icon: LayoutList },
  { label: "Active", value: "active", icon: Inbox },
  { label: "Archived", value: "archived", icon: Archive },
] as const;

const VendorChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"active" | "archived" | undefined>("active");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  const { isLoggedIn, user } = useAuthUser();
  const { data: chatsResponse, isLoading: chatsLoading } = useVendorChats(statusFilter, debouncedSearch);
  const chats = chatsResponse?.data ?? [];

  useEffect(() => {
    socketRef.current = connectWS();
  }, []);


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useVendorChatMessages(selectedChatId);
  const messages = data?.allMessages ?? [];

  const handleSendMessage = (content: string) => {
   socketRef.current?.emit(CHAT_EVENTS.SEND_NEW_VENDOR_MESSAGE, {
      chatId: selectedChatId,
      content
    });
  }


  const { mutate: pinMessage } = usePinMessage(selectedChatId ?? "");
  const { mutate: archiveChat } = useArchiveChat();
  const { mutate: removeMember } = useRemoveMember(selectedChatId ?? "");
  const { mutate: markAsRead } = useMarkChatAsReadForVendor(vendorChatKeys.chats(statusFilter, debouncedSearch));

  useChatSocket({
    chatId: selectedChatId,
    isAuthenticated: isLoggedIn,
    chatsQueryKey: vendorChatKeys.chats(statusFilter, debouncedSearch),
    getMessagesQueryKey: vendorChatKeys.messages,
    currentUserId: user?.id,
  });

  const selectedChat = chats.find((c) => c.id === selectedChatId) ?? null;

  function handleSelectChat(id: string) {
    setSelectedChatId(id);
    setMobileSidebarOpen(false);
    markAsRead(id);
  }

  if (isError) {
    return <Error message="Failed to load chats" />
  }

  return (
    <div className="min-h-screen bg-[#f7f7fb] font-['Inter'] px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
        <div className="flex flex-1 bg-background border border-border/60 rounded-2xl overflow-hidden shadow-md min-h-0">


          {mobileSidebarOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}

          <aside
            className={cn(
              "hidden md:flex w-64 lg:w-72 flex-shrink-0 border-r border-border/60 flex-col bg-background",
              mobileSidebarOpen &&
              "flex fixed inset-y-0 left-0 z-30 w-72 md:relative md:flex shadow-2xl"
            )}
          >
            <div className="px-4 pt-4 pb-3 border-b border-border/60 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h1 className="font-semibold text-sm text-foreground">Trip Chats</h1>
                <button
                  className="md:hidden w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-1 p-1 bg-muted/50 rounded-xl">
                {STATUS_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = statusFilter === tab.value;
                  return (
                    <button
                      key={tab.label}
                      onClick={() => setStatusFilter(tab.value)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1 text-[11px] font-medium py-1 px-1.5 rounded-lg transition-all duration-150",
                        isActive
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              <ChatSidebar
                chats={chats}
                selectedChatId={selectedChatId}
                onSelectChat={handleSelectChat}
                isLoading={chatsLoading}
                currentUserId={user?.id ?? ""}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </aside>


          <main className="flex-1 flex flex-col min-w-0">
            <div className="flex md:hidden items-center gap-3 px-4 py-3 border-b border-border/60 flex-shrink-0 bg-background">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-foreground">
                {selectedChat ? selectedChat.chatName : "Trip Chats"}
              </span>
            </div>

            {selectedChat ? (
              <ChatWindow
                chat={selectedChat}
                messages={messages}
                isLoading={isLoading}
                currentUserId={user?.id ?? ""}
                onSendText={handleSendMessage}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage ?? false}
                isFetchingNextPage={isFetchingNextPage}
                onPinMessage={pinMessage}
                onArchive={
                  selectedChat.status === "active"
                    ? () => archiveChat(selectedChat.id)
                    : undefined
                }
                onRemoveMember={(memberId) => removeMember(memberId)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 select-none">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-950/30 dark:to-indigo-950/30 flex items-center justify-center shadow-sm">
                  <MessageSquare className="w-9 h-9 text-violet-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground/70">
                    Select a chat to view
                  </p>
                  <p className="text-xs text-muted-foreground/50 mt-1">
                    Choose a trip group from the left panel
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default VendorChatPage;
