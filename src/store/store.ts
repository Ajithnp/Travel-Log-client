import { configureStore , combineReducers} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import  userReducer  from '@/store/slices/user.slice';
import adminReducer from '@/store/slices/admin.slice';
import vendorReducer from '@/store/slices/vendor.slice';

const rootReducer = combineReducers({
  user: userReducer,
  vendor: vendorReducer,
  admin: adminReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","vendor","admin"], // reducers  want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware({
        serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;