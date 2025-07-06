import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from '@/store/slices/user.slice';
import adminReducer from '@/store/slices/admin.slice';
import vendorReducer from '@/store/slices/vendor.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        vendor: vendorReducer,
        admin: adminReducer
       
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;