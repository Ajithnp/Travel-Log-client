import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";



export const getUserNotifications = async (
  page: number,
  limit: number,
  isRead?: boolean,
): Promise<ApiResponse<IPaginatedNotificationResponse>> => {
   const response: AxiosResponse<ApiResponse<IPaginatedNotificationResponse>> =
    await api.get(`${API_ENDPOINTS.NOTIFICATION}`, {
      params: { page, limit, ...(isRead !== undefined ? { isRead }: {})},
    });
  return response.data ;
};


export const getUserUnreadCount = async (): Promise<ApiResponse<{unreadCount: number}>> => {
   const response: AxiosResponse<ApiResponse<{unreadCount: number}>> =
    await api.get(`${API_ENDPOINTS.NOTIFICATION}${API_ROUTE.NOTIFICATIONS_UNREAD_COUNT}`);
  return response.data ;
};



export const markAllRead = async (): Promise<ApiResponse<{modifiedCount: number}>> => {
   const response: AxiosResponse<ApiResponse<{modifiedCount: number}>> =
    await api.patch(`${API_ENDPOINTS.NOTIFICATION}${API_ROUTE.NOTIFICATIONS_MARK_ALL_READ}`);
  return response.data ;
};

export const markOneRead = async (id: string): Promise<ApiResponse<{modifiedCount: number}>> => {
   const response: AxiosResponse<ApiResponse<{modifiedCount: number}>> =
    await api.patch(`${API_ENDPOINTS.NOTIFICATION}${API_ROUTE.NOTIFICATIONS_MARK_ONE_READ(id)}`);
  return response.data ;
};


export const deleteNotification = async (id: string): Promise<ApiResponse<null>> => {
   const response: AxiosResponse<ApiResponse<null>> =
    await api.delete(`${API_ENDPOINTS.NOTIFICATION}/${id}`);
  return response.data ;
};


//response dtos
export interface NotificationResponseDTO {
  _id: string;
  recipientId: string;
  recipientRole: 'admin' | 'user' |'vendor';
  senderId: string | null;
  notificationType: string;
  title: string;
  message: string;
  data: Record<string, unknown>;
  redirectUrl: string | null;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginatedNotificationResponse {
  notifications: NotificationResponseDTO[];
  total: number;
  unreadCount:number;
  page: number;
  limit: number;
  totalPages: number;
}