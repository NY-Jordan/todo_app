import PrelineScript from "@/presentation/components/PrelineScript";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Provider} from "react-redux";
import {store} from "@/app/store/store";
import  { Toaster } from 'react-hot-toast';
import usePusherSetup from "@/Infrastructure/hooks/usePusherSetup";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function App({ Component, pageProps }: AppProps) {
  const echo = usePusherSetup();

  const queryClient = new QueryClient()

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
