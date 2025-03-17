import PrelineScript from "@/presentation/components/PrelineScript";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Provider} from "react-redux";
import {store} from "@/app/store/store";
import  { Toaster } from 'react-hot-toast';
import usePusherSetup from "@/Infrastructure/hooks/usePusherSetup";
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'


import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useAppSelector } from "@/app/store/hook";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {

   // Créer un QueryClient
   const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, 
      },
    },
  });


  

  return <QueryClientProvider client={queryClient}> 
  <Provider store={store}>
    <Component {...pageProps} />
      <Toaster
    toastOptions={{
      success: {
        position: 'top-left',
      },
      error: {
        position: 'top-left',
      },
    }}
      />
  </Provider>
  </QueryClientProvider>;
}
