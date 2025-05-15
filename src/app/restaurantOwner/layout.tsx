import { SidebarProvider } from "@/components/ui/sidebar";
import RestaurantHome from "./page";
import { Header } from "@/components/restaurantOwner/Header";
import { RestaurantSidebar } from "@/components/restaurantOwner/RestaurantSidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main>
                <div className="">
                    {children}
                </div>
            </main>
        </>
    )
}
