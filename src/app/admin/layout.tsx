import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Admin/app-sidebar"
import { AdminHeader } from "@/components/Admin/components/AdminHeader"
import { ThemeProvider } from "@/components/theme-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <ThemeProvider>
      <SidebarProvider>
        <AdminHeader />
        <AppSidebar />
        <main>
          <div className="mt-20">
          {children}
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>

  )
}
