'use client'

import { Toaster } from "sonner";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
        <Toaster richColors position="top-center" />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
