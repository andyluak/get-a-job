import type { AppProps } from "next/app";

import Navbar from "@/components/Navbar";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import MacFooter from "@/components/MacFooter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
      <MacFooter />
    </QueryClientProvider>
  );
}
