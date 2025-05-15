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
  SidebarProvider,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "/restaurantOwner/dashboard",
    icon: LucideLayoutDashboard,
  },
  {
    title: "Restarant-Details",
    url: "/restaurantOwner/edit-restaurantDetails",
    icon: Hotel,
  },
  {
    title: "Add Menu",
    url: "/restaurantOwner/add-menuCategory",
    icon: MenuSquareIcon,
  },
  {
    title: "Collection",
    url: "/restaurantOwner/add-collection",
    icon: SquareMenu,
  },
  {
    title: "Add Dishes",
    url: "/restaurantOwner/add-dish",
    icon: Circle,
  },
]

export function RestaurantSidebar() {
  return (
    <SidebarProvider>

    <Sidebar className="mt-16">
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
    </SidebarProvider>
  )
}
