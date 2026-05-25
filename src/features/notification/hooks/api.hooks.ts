import type { ApiResponse } from "@/types/IApiResponse";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNotification, getUserNotifications, markAllRead, markOneRead, markTabsAsRead, type IPaginatedNotificationResponse, type NotificationResponseDTO } from "../services/api.services";
import type { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { clearUnreadCount, setUnreadCount } from "@/store/slices/notification.slice";
import type { TabKey } from "@/store/slices/unreadTabSlice";


export const useNotificationQuery = (
  page: number,
  limit: number,
  isRead?:boolean
) => {
  return useQuery<ApiResponse<IPaginatedNotificationResponse>,AxiosError<{ message: string }>>({
    queryKey: ["notifications",{ page, limit, isRead }],
    queryFn:()=> getUserNotifications(page, limit, isRead),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData, 
    refetchOnWindowFocus: false,
  });
};

type MarkAllContext = {
  previousCount: ApiResponse<{ unreadCount: number }> | undefined;
};

export const useMarkAllAsReadMutation = () => {
  const dispatch    = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
 
  return useMutation<ApiResponse<{ modifiedCount: number }>, AxiosError, void, MarkAllContext>({
    mutationFn: () => markAllRead(),
 
 
    onMutate: async () => {
      const previousCount = queryClient.getQueryData<ApiResponse<{ unreadCount: number }>>(
        ['notifications_unread_count']
      );
      dispatch(clearUnreadCount());      
      return { previousCount };          
    },
 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications_unread_count'] });
    },
 
    onError: (_err, _vars, context) => {
      if (context?.previousCount) {
        dispatch(setUnreadCount(context.previousCount.data.unreadCount));
      }
    },
  });
};


 
export const useMarkOneAsReadMutation = () => {

  const queryClient = useQueryClient();
 
  return useMutation<ApiResponse<{ modifiedCount: number }>, AxiosError, string>({
    mutationFn: (notificationId: string) => markOneRead(notificationId),
 
onSuccess: (_data, notificationId) => {
  queryClient.setQueriesData<ApiResponse<IPaginatedNotificationResponse>>(
    {
      queryKey: ['notifications'],
      predicate: (query) =>
        (query.queryKey[1] as { isRead?: boolean })?.isRead !== false, 
    },
    (oldData): ApiResponse<IPaginatedNotificationResponse> | undefined => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        data: {
          ...oldData.data,
          notifications: oldData.data.notifications.map(
            (n: NotificationResponseDTO) =>
              n._id === notificationId ? { ...n, isRead: true } : n
          ),
        },
      };
    },
  );

  queryClient.invalidateQueries({
    queryKey: ['notifications'],
    predicate: (query) =>
      (query.queryKey[1] as { isRead?: boolean })?.isRead === false,
  });

  queryClient.invalidateQueries({ queryKey: ['notifications_unread_count'] });
},
  });
};


 
export const useDeleteNotificationMutation = () => {
  const queryClient = useQueryClient();
 
  return useMutation<ApiResponse<null>, AxiosError, string>({
    mutationFn: (notificationId: string) => deleteNotification(notificationId),
 
    onSuccess: (_data, notificationId) => {
      queryClient.setQueriesData<ApiResponse<IPaginatedNotificationResponse>>(
        { queryKey: ['notifications'] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              notifications: oldData.data.notifications.filter(
                (n) => n._id !== notificationId
              ),
              total: oldData.data.total - 1,
            },
          };
        },
      );
 
      queryClient.invalidateQueries({ queryKey: ['notifications_unread_count'] });
    },
  });
};

export const useMarkTabsAsReadMutation = () => {
  return useMutation<ApiResponse<null>, AxiosError, TabKey>({
    mutationFn: markTabsAsRead,
  });
};