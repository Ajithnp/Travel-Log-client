import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult, UseMutationResult, UseInfiniteQueryResult } from "@tanstack/react-query";
import { archiveChat, getChatMembers, getUserChat, getUserChatMessages, getVendorChatMessages, getVendorChats, markChatAsReadForVendor, pinMessage, removeMember, sendUserMessage, sendVendorMessage } from "../services/api.services";
import type { ChatRoom, MessagesResponse, Message, ChatMemberDetail } from "../services/api.services";
import type { ApiResponse } from "@/types/IApiResponse";

const MESSAGES_LIMIT = 30;

export const userChatKeys = {
  chat: (chatId: string) => ["user", "chats", chatId] as const,
  messages: (chatId: string) => ["user", "chats", chatId, "messages"] as const,
};


export const useUserChatQuery = (chatId:string): UseQueryResult<ApiResponse<ChatRoom>, Error> =>
  useQuery({
    queryKey: userChatKeys.chat(chatId),
    queryFn: () => getUserChat(chatId),
    staleTime: 5 * 60 * 1000,
    enabled: !!chatId,
  });


export const useUserChatMessages = (chatId: string | null): UseInfiniteQueryResult<{
  pages: ApiResponse<MessagesResponse>[];
  pageParams: unknown[];
  allMessages: Message[];
}, Error> =>
  
  useInfiniteQuery({
    queryKey: userChatKeys.messages(chatId!),
    queryFn: ({ pageParam }) => getUserChatMessages(chatId!, pageParam, MESSAGES_LIMIT),
    enabled: !!chatId,
    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,

    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      allMessages: [...data.pages].reverse().flatMap((page) => page.data.messages),
    }),

    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

export const useSendUserTextMessage = (chatId: string): UseMutationResult<ApiResponse<Message>, Error, string> => {
  return useMutation({
    mutationFn: (content: string) =>
     sendUserMessage(chatId,content),
  });
};

// vendor

export const vendorChatKeys = {
  chats: (status?: string, search?: string) => ["vendor", "chats", status ?? "all", search ?? ""] as const,
  messages: (chatId: string) =>
    ["vendor", "chats", chatId, "messages"] as const,
  members: (chatId: string) =>
    ["vendor", "chats", chatId, "members"] as const,
};
 

export const useVendorChats = (status?: "active" | "archived", search?: string): UseQueryResult<ApiResponse<ChatRoom[]>, Error> =>
  useQuery({
    queryKey: vendorChatKeys.chats(status, search),
    queryFn: () => getVendorChats(status, search),
  });
 
export const useVendorChatMessages = (chatId: string | null): UseInfiniteQueryResult<{
  pages: ApiResponse<MessagesResponse>[];
  pageParams: unknown[];
  allMessages: Message[];
}, Error> =>
  useInfiniteQuery({
    queryKey: vendorChatKeys.messages(chatId!),
    queryFn: ({ pageParam }) => getVendorChatMessages(chatId!, pageParam, MESSAGES_LIMIT),
    enabled: !!chatId,
    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,

    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      allMessages: [...data.pages].reverse().flatMap((page) => page.data.messages),
    }),

    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

export const useChatMembers = (chatId: string | null): UseQueryResult<ApiResponse<ChatMemberDetail[]>, Error> =>
  useQuery({
    queryKey: vendorChatKeys.members(chatId ?? ''),
    queryFn: () => getChatMembers(chatId!),
    enabled: !!chatId,
  });
 

export const useSendVendorTextMessage = (chatId: string): UseMutationResult<ApiResponse<Message>, Error, string> => {
  return useMutation({
    mutationFn: (content: string) =>
      sendVendorMessage(chatId,content),

  });
};
 
 
export const usePinMessage = (chatId: string): UseMutationResult<ApiResponse<ChatRoom>, Error, string> => {
  return useMutation({
    mutationFn: (message: string) =>
      pinMessage(chatId, message),
  });
};
 
export const useRemoveMember = (chatId: string): UseMutationResult<ApiResponse<ChatRoom>, Error, string> => {
  return useMutation({
    mutationFn: (userId: string) =>
      removeMember(chatId, userId),
  });
};
 

export const useArchiveChat = (): UseMutationResult<ApiResponse<ChatRoom>, Error, string> => {
  return useMutation({
    mutationFn: (chatId: string) => archiveChat(chatId),
  });
};


export const useMarkChatAsReadForVendor = (
  chatsQueryKey: readonly unknown[]
): UseMutationResult<ApiResponse<void>, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => markChatAsReadForVendor(chatId),

    onMutate: async (chatId) => {
      queryClient.setQueryData<ApiResponse<ChatRoom[]>>(
        chatsQueryKey,
        (oldData) => {
          if (!oldData || !Array.isArray(oldData.data)) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((chat) =>
              chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
            ),
          };
        }
      );
    },
  });
};
