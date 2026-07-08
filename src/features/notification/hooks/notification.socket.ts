import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import {
  setUnreadCount,
  incrementUnreadCount,
  clearUnreadCount,
} from '@/store/slices/notification.slice';
import { addUnreadTab,setUnreadTabs } from '@/store/slices/unreadTabSlice';
import { type TabKey } from "@/store/slices/unreadTabSlice";
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

    const onSetTabs = ({ tabs }: { tabs: TabKey[] }) => {
      dispatchRef.current(setUnreadTabs(tabs));
    };

    const onNewTab = ({ tab }: { tab: TabKey }) => {
      dispatchRef.current(addUnreadTab(tab));
    }

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("disconnect", onDisconnect);
    socket.on("notification_new", onNotificationNew);
    socket.on("notification_unread_count", onUnreadCount);
    socket.on("notification_read_all", onReadAll);

    socket.on("tab_read",onSetTabs);
    socket.on("tab_new",onNewTab);

    return () => {

      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("disconnect", onDisconnect);
      socket.off("notification_new", onNotificationNew);
      socket.off("notification_unread_count", onUnreadCount);
      socket.off("notification_read_all", onReadAll);

      socket.off("tab_read",onSetTabs);
      socket.off("tab_unread",onNewTab);
      socket.disconnect();
    };
  }, [isAuthenticated]); 
}