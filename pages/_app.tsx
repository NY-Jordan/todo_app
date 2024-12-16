import PrelineScript from "@/presentation/components/PrelineScript";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Provider} from "react-redux";
import {store} from "@/app/store/store";
import  { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }: AppProps) {
  return  <Provider store={store}>
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
  </Provider>;
}
