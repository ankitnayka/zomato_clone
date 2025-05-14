import { Calendar, Circle, Home, Hotel, Inbox, LucideLayoutDashboard, MenuSquareIcon, Search, Settings, SquareMenu } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin/dashboard",
    icon: LucideLayoutDashboard,
  },
  {
    title: "Add Restaurant",
    url: "/admin/add-restaurants",
    icon: Hotel,
  },
  {
    title: "Add Menu",
    url: "/admin/menu-categories",
    icon: MenuSquareIcon,
  },
  {
    title: "Collection",
    url: "/admin/add-collection",
    icon: SquareMenu,
  },
  {
    title: "Add Dishes",
    url: "/admin/add-dish",
    icon: Circle,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="mt-12 ">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu> 
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
