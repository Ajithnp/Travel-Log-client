import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import {
  setUnreadCount,
  incrementUnreadCount,
  clearUnreadCount,
} from '@/store/slices/notification.slice';
import type { AppDispatch } from '@/store/store';
import { connectWS } from '@/config/socket/socket.config';
import { selectIsAuthenticated } from '@/store/slices/user.slice';
import type { ApiResponse } from '@/types/IApiResponse';
import type { IPaginatedNotificationResponse, NotificationResponseDTO } from '../services/api.services';


export function useNotificationSocket() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();


  const dispatchRef = useRef(dispatch);
  const queryClientRef = useRef(queryClient);
  useEffect(() => { dispatchRef.current = dispatch; }, [dispatch]);
  useEffect(() => { queryClientRef.current = queryClient; }, [queryClient]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = connectWS(); 

    const onConnect = () => {
      console.log('[Socket] Connected:', socket.id);
      queryClientRef.current.invalidateQueries({ queryKey: ['notifications'] });
    };

    socket.onAny((event, ...args) => {
      console.log('[SOCKET ANY]', event, args);
    });

    const onConnectError = (err: Error) => {
      console.error('[Socket] Connection error:', err.message);
    };

    const onDisconnect = (reason: string) => {
      console.log('[Socket] Disconnected:', reason);
    };

    const onNotificationNew = (newNotification: NotificationResponseDTO) => {
      console.log('[Notification] received', newNotification);
      dispatchRef.current(incrementUnreadCount());
      queryClientRef.current.setQueriesData<ApiResponse<IPaginatedNotificationResponse>>(
        { queryKey: ['notifications'] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              notifications: [newNotification, ...oldData.data.notifications],
              total: oldData.data.total + 1,
              unreadCount: oldData.data.unreadCount + 1,
            },
          };
        }
      );
    };

    const onUnreadCount = ({ count }: { count: number }) => {
      dispatchRef.current(setUnreadCount(count));
    };

    const onReadAll = () => {
      dispatchRef.current(clearUnreadCount());
      queryClientRef.current.invalidateQueries({ queryKey: ['notifications'] });
    };

    // put all in double quatation  mark"""
    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("disconnect", onDisconnect);
    socket.on("notification_new", onNotificationNew);
    socket.on("notification_unread_count", onUnreadCount);
    socket.on("notification_read_all", onReadAll);

    return () => {

      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("disconnect", onDisconnect);
      socket.off("notification_new", onNotificationNew);
      socket.off("notification_unread_count", onUnreadCount);
      socket.off("notification_read_all", onReadAll);
      socket.disconnect();
    };
  }, [isAuthenticated]); 
}