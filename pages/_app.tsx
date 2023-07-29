import type { AppProps } from "next/app";

import Navbar from "@/components/Navbar";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import MacFooter from "@/components/MacFooter";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
      <MacFooter />
    </>
  );
}
