import { useEffect, useRef } from "react";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { connectWS } from "@/config/socket/socket.config";
import type {
  ChatRoom,
  Message,
  MessagesResponse,
} from "../services/api.services";
import type { IUserSlice } from "@/store/slices/user.slice";
import type { ApiResponse } from "@/types/IApiResponse";
import { ROLE } from "@/types/Role";

const CHAT_EVENTS = {
  JOIN_ROOM: "chat:join",
  LEAVE_ROOM: "chat:leave",
  MESSAGE_NEW: "chat:message_new",
  ROOM_UPDATED: "chat:room_updated",
} as const;

interface RoomUpdatedPayload {
  chatId: string;
  pinnedMessage?: string;
  blockedUserId?: string;
  status?: "active" | "archived";
}

interface UseChatSocketOptions {
  chatId: string | null;
  isAuthenticated: IUserSlice | null;
  chatsQueryKey: readonly unknown[];
  getMessagesQueryKey: (chatId: string) => readonly unknown[];
  getChatQueryKey?: (chatId: string) => readonly unknown[];
  currentUserId?: string;
}

export function useChatSocket({
  chatId,
  isAuthenticated,
  chatsQueryKey,
  getMessagesQueryKey,
  getChatQueryKey,
  currentUserId,
}: UseChatSocketOptions) {
  const queryClient = useQueryClient();
  const queryClientRef = useRef(queryClient);
  useEffect(() => {
    queryClientRef.current = queryClient;
  }, [queryClient]);

  const chatIdRef = useRef(chatId);
  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);

  const chatsQueryKeyRef = useRef(chatsQueryKey);
  useEffect(() => {
    chatsQueryKeyRef.current = chatsQueryKey;
  }, [chatsQueryKey]);

  const currentUserIdRef = useRef(currentUserId);
  useEffect(() => {
    currentUserIdRef.current = currentUserId;
  }, [currentUserId]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = connectWS();

    if (chatId) {
      socket.emit(CHAT_EVENTS.JOIN_ROOM, { chatId });
    }

const onMessageNew = (newMessage: Message) => {

  if (newMessage.chatId === chatIdRef.current) {
    const queryKey = getMessagesQueryKey(chatIdRef.current!);
    queryClientRef.current.setQueryData<InfiniteData<ApiResponse<MessagesResponse>>>(
      queryKey,
      (oldData) => {
        if (!oldData) return oldData;
        const exists = oldData.pages.some((page) =>
          page.data?.messages?.some((m) => m.id === newMessage.id)
        );
        if (exists) return oldData;

        const updatedPages = oldData.pages.map((page, index) => {
          if (index !== 0) return page;
          return {
            ...page,
            data: {
              ...page.data,
              messages: [...(page.data?.messages ?? []), newMessage],
            },
          };
        });
        return { ...oldData, pages: updatedPages };
      }
    );
    return; 
  }

  if (newMessage.senderRole === ROLE.USER) {
    queryClientRef.current.setQueryData<ApiResponse<ChatRoom[]>>(
      chatsQueryKeyRef.current,
      (oldData) => {
        if (!oldData || !Array.isArray(oldData.data)) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((chat) =>
            chat.id === newMessage.chatId
              ? { ...chat, unreadCount: (chat.unreadCount ?? 0) + 1 }
              : chat
          ),
        };
      }
    );
  }
}
    const handlePinUpdated = (updatedChatId: string, pinnedMessage: string) => {
      if (getChatQueryKey) {
        queryClientRef.current.setQueryData<ApiResponse<ChatRoom>>(
          getChatQueryKey(updatedChatId),
          (oldData) => {
            if (!oldData) return oldData;
            return { ...oldData, data: { ...oldData.data, pinnedMessage } };
          },
        );
      } else {
        queryClientRef.current.setQueryData<ApiResponse<ChatRoom[]>>(
          chatsQueryKeyRef.current,
          (oldData) => {
            if (!oldData || !Array.isArray(oldData.data)) return oldData;
            return {
              ...oldData,
              data: oldData.data.map((chat) =>
                chat.id === updatedChatId ? { ...chat, pinnedMessage } : chat,
              ),
            };
          },
        );
      }
    };

    const handleMemberBlocked = (
      updatedChatId: string,
      blockedUserId: string,
    ) => {
      if (getChatQueryKey) {
        queryClientRef.current.setQueryData<ApiResponse<ChatRoom>>(
          getChatQueryKey(updatedChatId),
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                members: oldData.data.members.map((m) =>
                  m.userId === blockedUserId ? { ...m, isActive: false } : m,
                ),
              },
            };
          },
        );
      } else {
        queryClientRef.current.setQueryData<ApiResponse<ChatRoom[]>>(
          chatsQueryKeyRef.current,
          (oldData) => {
            if (!oldData || !Array.isArray(oldData.data)) return oldData;
            return {
              ...oldData,
              data: oldData.data.map((chat) =>
                chat.id === updatedChatId
                  ? {
                      ...chat,
                      members: chat.members.map((m) =>
                        m.userId === blockedUserId
                          ? { ...m, isActive: false }
                          : m,
                      ),
                    }
                  : chat,
              ),
            };
          },
        );
      }
    };

    const handleArchived = (updatedChatId: string) => {
      if (getChatQueryKey) {
        queryClientRef.current.setQueryData<ApiResponse<ChatRoom>>(
          getChatQueryKey(updatedChatId),
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: { ...oldData.data, status: "archived" },
            };
          },
        );
      } else {
        const currentKey = chatsQueryKeyRef.current;
        const isFilteredByActive = currentKey.includes("active");

        queryClientRef.current.setQueryData<ApiResponse<ChatRoom[]>>(
          currentKey,
          (oldData) => {
            if (!oldData || !Array.isArray(oldData.data)) return oldData;

            if (isFilteredByActive) {
              return {
                ...oldData,
                data: oldData.data.filter((chat) => chat.id !== updatedChatId),
              };
            } else {
              return {
                ...oldData,
                data: oldData.data.map((chat) =>
                  chat.id === updatedChatId
                    ? { ...chat, status: "archived" as const }
                    : chat,
                ),
              };
            }
          },
        );
      }
    };

    const handleFallback = () => {
      queryClientRef.current.invalidateQueries({
        queryKey: chatsQueryKeyRef.current,
      });
    };
    const onRoomUpdated = (payload: RoomUpdatedPayload) => {
    
      const {
        chatId: updatedChatId,
        pinnedMessage,
        blockedUserId,
        status,
      } = payload;
      if (updatedChatId !== chatIdRef.current) return;

      if (pinnedMessage !== undefined)
        return handlePinUpdated(updatedChatId, pinnedMessage);
      if (blockedUserId !== undefined)
        return handleMemberBlocked(updatedChatId, blockedUserId);
      if (status !== undefined) return handleArchived(updatedChatId);

      handleFallback();
    };

    socket.on(CHAT_EVENTS.MESSAGE_NEW, onMessageNew);
    socket.on(CHAT_EVENTS.ROOM_UPDATED, onRoomUpdated);

    return () => {
      if (chatIdRef.current) {
        socket.emit(CHAT_EVENTS.LEAVE_ROOM, { chatId: chatIdRef.current });
      }
      socket.off(CHAT_EVENTS.MESSAGE_NEW, onMessageNew);
      socket.off(CHAT_EVENTS.ROOM_UPDATED, onRoomUpdated);
    };
  }, [isAuthenticated, chatId]);
}
