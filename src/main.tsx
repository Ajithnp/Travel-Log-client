import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from 'react-redux';
import { store,persistor } from './store/store.ts'
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
       <App />
      </PersistGate>
    </QueryClientProvider>
   </Provider>
  // </StrictMode>,
)
