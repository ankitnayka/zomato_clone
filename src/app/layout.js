'use client'

import { Toaster } from "sonner";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
        <Navbar/>
        <Tabs/>
        <Toaster richColors position="top-center" />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
