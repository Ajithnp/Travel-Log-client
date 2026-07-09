import { useEffect, useRef, useState } from "react";
import { MessageSquare } from "lucide-react";
import { ChatWindow } from "../components/chat/chat-window";
import {
  userChatKeys,
  useUserChatMessages,
  useUserChatQuery,
} from "../hooks/api.hooks";
import { useAuthUser } from "@/hooks/useAuthUser";
import { CHAT_EVENTS, useChatSocket } from "../hooks/chat-socket";
import { useLocation } from "react-router-dom";
import { Error } from "@/components/common/error";
import { connectWS } from "@/config/socket/socket.config";
import type { Socket } from "socket.io-client";

const UserChatPage = () => {
  const location = useLocation();

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);

  const { isLoggedIn, user } = useAuthUser();

  useEffect(() => {
    socketRef.current = connectWS();
  }, []);

  const { data: chatsResponse, isLoading: chatsLoading, isError: chatsIsError } =
    useUserChatQuery(selectedChatId ?? "");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useUserChatMessages(selectedChatId);
  const messages = data?.allMessages ?? [];

  const handleSendMessage = (content: string) => {
    socketRef.current?.emit(CHAT_EVENTS.SEND_NEW_USER_MESSAGE, {
      chatId: selectedChatId,
      content
    });
  }

  useChatSocket({
    chatId: selectedChatId,
    isAuthenticated: isLoggedIn,
    chatsQueryKey: userChatKeys.chat(selectedChatId ?? ""),
    getMessagesQueryKey: userChatKeys.messages,
    getChatQueryKey: userChatKeys.chat,
    currentUserId: user?.id ?? "",
  });

  useEffect(() => {
    if (location.state?.chatId) {
      setSelectedChatId(location.state.chatId);
    }
  }, [location.state]);

  if (chatsLoading) {
    return (
      <div className="px-4 md:px-6 mt-20 pb-4 flex h-[calc(100vh-96px)] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading chat…</p>
        </div>
      </div>
    );
  }
  if (chatsIsError || isError) {
    return <Error message="Failed to load chats" />;
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 bg-[#f7f7fb] font-['Inter'] sm:py-8 mt-20">
      <div className="max-w-[97rem] mx-auto">
        <div className="flex h-[calc(90vh-88px)] bg-background border border-border/60 rounded-2xl overflow-hidden shadow-md">
          <div className="flex-1 flex flex-col min-w-0">
            {chatsResponse?.data ? (
              <ChatWindow
                chat={chatsResponse.data}
                messages={messages}
                isLoading={isLoading}
                currentUserId={user?.id ?? ""}
                onSendText={handleSendMessage}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage ?? false}
                isFetchingNextPage={isFetchingNextPage}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 select-none">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-950/30 dark:to-indigo-950/30 flex items-center justify-center shadow-sm">
                  <MessageSquare className="w-9 h-9 text-violet-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground/70">
                    No chat open
                  </p>
                  <p className="text-xs text-muted-foreground/50 mt-1">
                    Navigate here from a trip booking to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatPage;