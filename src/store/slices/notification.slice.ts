import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
 
interface NotificationState {
  unreadCount: number;
}
 
const initialState: NotificationState = {
  unreadCount: 0,
};
 
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
 
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
 
    // Called by socket when a new notification arrives in real time
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
 
    // Called after mark-all-read
    clearUnreadCount: (state) => {
      state.unreadCount = 0;
    },
 
    // Called on logout — clear everything
    resetNotifications: () => initialState,
  },
});
 
export const {
  setUnreadCount,
  incrementUnreadCount,
  clearUnreadCount,
  resetNotifications,
} = notificationSlice.actions;
 
export const selectUnreadCount = (state: RootState) =>
  state.notification.unreadCount;
 
export default notificationSlice.reducer;