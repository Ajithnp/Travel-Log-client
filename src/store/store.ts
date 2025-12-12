import { configureStore , combineReducers} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import  userReducer  from '@/store/slices/user.slice';

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"], // reducers  want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware({
         serializableCheck: {
           ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;