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
  const hideNavAndTabs = pathname.startsWith("/admin") || pathname.startsWith("/restaurantOwner");
  const [activeTab, setActiveTab] = useState("Dining Out");

  return (
    <SessionProvider>
      {!hideNavAndTabs && <Navbar />}
      {!hideNavAndTabs && <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />}
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




// export default function ClientLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const isAdminPage = pathname.startsWith("/admin");
//   const isRestaurantPage=pathname.startsWith("/restaurantOwner");
//   const [activeTab, setActiveTab] = useState("Dining Out");

//   return (
//     <SessionProvider> 
//       {!isAdminPage || !isRestaurantPage && <Navbar />}
//       {(!isAdminPage || !isRestaurantPage) && <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />}
//       <Toaster richColors position="top-center" />
//       {activeTab === "Dining Out" ? (
//         <div className="max-w-7xl mx-auto px-4">{children}</div>
//       ) : (
//         <div className="max-w-7xl mx-auto px-4">
//           <Delivery />
//         </div>
//       )}
//     </SessionProvider>
//   );
// }
