'use client'

import { Toaster } from "sonner";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import { useState } from "react";
import Delivery from "./Delivery";

export default function RootLayout({ children }) {
  const [activeTab, setActiveTab] = useState("Dining Out");
// console.log("Root Level",activeTab)
  return (
    <SessionProvider>
      <html lang="en">
        <body>
        <Navbar/>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Toaster richColors position="top-center" />
           {activeTab === "Dining Out" && (
            <div className="max-w-7xl mx-auto px-4">
              {/* <h2 className="text-xl font-semibold my-4">Dining Out Section</h2> */}
              {children}  
            </div>
          )}
           {activeTab === "Delivery" && (
            <div className="max-w-7xl mx-auto px-4">
              {/* <h2 className="text-xl font-semibold my-4">Delivery... </h2> */}
            
            <Delivery/>
            </div>
          )}
            
        </body>
      </html>
    </SessionProvider>
  );
}
