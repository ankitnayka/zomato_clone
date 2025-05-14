'use client'
import { Bell, ChevronDown, Search, User } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AdminHeader() {
  const [searchText, setSearchText] = useState('');
  const { setTheme } = useTheme()

  return (
    <div className=" h-16 border-b border-border fixed top-0 right-0 left-0 z-20 bg-background">
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold hidden md:block">Dashboard</h1>
        </div>

        <div className="flex-1 mx-4 md:mx-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-secondary/50"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
            <Bell size={18} />
          </button>
          <div className="flex items-center space-x-1">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User size={15} />
            </div>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}