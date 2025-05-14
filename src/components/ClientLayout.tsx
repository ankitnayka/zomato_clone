// components/ClientLayout.tsx
'use client';

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
import { Toaster } from "sonner";
import Delivery from "@/app/Delivery";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const [activeTab, setActiveTab] = useState("Dining Out");

  return (
    <SessionProvider> {/* ✅ Safe to use here */}
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />}
      <Toaster richColors position="top-center" />
      {activeTab === "Dining Out" ? (
        <div className="max-w-7xl mx-auto px-4">{children}</div>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <Delivery />
        </div>
      )}
    </SessionProvider>
  );
}
