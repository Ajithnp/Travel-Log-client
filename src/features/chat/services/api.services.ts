import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";


export const getUserChat = async (chatId:string): Promise<ApiResponse<ChatRoom>> => {
   const response: AxiosResponse<ApiResponse<ChatRoom>> =
    await api.get(`${API_ENDPOINTS.USER_CHATS}/${chatId}`);
  return response.data ;
};


export const getUserChatMessages = async (chatId: string, cursor?: string,limit = 30): Promise<ApiResponse<MessagesResponse>> => {
    const response: AxiosResponse<ApiResponse<MessagesResponse>> =
     await api.get(`${API_ENDPOINTS.USER_CHATS}${API_ROUTE.GET_MESSAGES(chatId)}`, { params: cursor ? { cursor, limit } : {limit} });
    return response.data;
};


export const sendUserMessage = async (chatId: string,content: string): Promise<ApiResponse<Message>> => {
    const response: AxiosResponse<ApiResponse<Message>> = await api.post(
      `${API_ENDPOINTS.USER_CHATS}${API_ROUTE.POST_MESSAGE(chatId)}`,
      { messageType: "text", content }
    );
    return response.data;
};  

// ─── Vendor API 

export const getVendorChats = async (status?: "active" | "archived", search?: string): Promise<ApiResponse<ChatRoom[]>> => {
    const params: {status?: "active" | "archived"; search?: string} = {};
    if (status) params.status = status;
    if (search) params.search = search;

    const response: AxiosResponse<ApiResponse<ChatRoom[]>> = await api.get(
      `${API_ENDPOINTS.VENDOR_CHATS}`,
      { params },
    );
    return response.data;
};

export const getVendorChatMessages = async (chatId: string, cursor?: string, limit = 30): Promise<ApiResponse<MessagesResponse>> => {
    const response: AxiosResponse<ApiResponse<MessagesResponse>> =
     await api.get(`${API_ENDPOINTS.VENDOR_CHATS}${API_ROUTE.GET_MESSAGES(chatId)}`, { params: cursor ? { cursor, limit } : {limit} });
    return response.data;
};

export const sendVendorMessage = async (chatId: string,content: string): Promise<ApiResponse<Message>> => {
    const response: AxiosResponse<ApiResponse<Message>> = await api.post(
      `${API_ENDPOINTS.VENDOR_CHATS}${API_ROUTE.POST_MESSAGE(chatId)}`,
      { messageType: "text", content }
    );
    return response.data;
}; 

export const pinMessage = async (chatId: string, message: string): Promise<ApiResponse<ChatRoom>> => {
    const response: AxiosResponse<ApiResponse<ChatRoom>> = await api.patch(
      `${API_ENDPOINTS.VENDOR_CHATS}/${chatId}/pin`,
      { message }
    );
    return response.data;
};


export const removeMember = async (chatId: string, userId: string): Promise<ApiResponse<ChatRoom>> => {
    const response: AxiosResponse<ApiResponse<ChatRoom>> = await api.patch(
      `${API_ENDPOINTS.VENDOR_CHATS}/${chatId}/members/${userId}`,
    );
    return response.data;
};

export const archiveChat = async (chatId: string): Promise<ApiResponse<ChatRoom>> => {
    const response: AxiosResponse<ApiResponse<ChatRoom>> = await api.patch(
      `${API_ENDPOINTS.VENDOR_CHATS}/${chatId}/archive`,
    );
    return response.data;
};

export const getChatMembers = async (chatId: string): Promise<ApiResponse<ChatMemberDetail[]>> => {
    const response: AxiosResponse<ApiResponse<ChatMemberDetail[]>> = await api.get(
      `${API_ENDPOINTS.VENDOR_CHATS}/${chatId}/members`
    );
    return response.data;
};


export const markChatAsReadForVendor = async (chatId: string): Promise<ApiResponse<void>> => {
    const response: AxiosResponse<ApiResponse<void>> = await api.patch(
      `${API_ENDPOINTS.VENDOR_CHATS}/${chatId}/read`
    );
    return response.data;
};



export interface ChatMember {
  userId: string;
  joinedAt: string;
  isActive: boolean;
}
 
export interface LastMessage {
  _id: string;
  senderName: string;
  content: string;
  createdAt: string;
}

export interface ChatMemberDetail {
  id: string;
  name: string;
  status: boolean;
}
 
export interface ChatRoom {
  id: string;
  chatName: string;
  scheduleId:string;
  packageId: string;
  vendorId: string;
  members: ChatMember[];
  pinnedMessage?: string;
  status: "active" | "archived";
  lastMessage?: LastMessage;
  unreadCount?: number;  
}
 
export interface Message {
  id: string
  chatId: string;
  senderId:string;
  senderRole: "user" | "vendor";
  senderName: string;
  content: string;
  createdAt: Date;
}
 
export interface MessagesResponse {
  messages: Message[];
  nextCursor?: string;
  hasMore: boolean;
}