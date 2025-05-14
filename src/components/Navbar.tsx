"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaLocationDot } from "react-icons/fa6";
import { Menu } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import AuthModal from "./AuthModal";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const { data: session, status } = useSession();
  const { setTheme } = useTheme()

  if (status === "loading") return <div>Loading....</div>;

  const isAuthenticated = !!session?.user;

  return (
    <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between border-b">
      {/* Logo */}
      <div className="text-3xl font-extrabold text-rose-500 w-[20%]">
        <Link href={"/"}>Zomato</Link>
      </div>

      {/* Large screen Search */}
      <div className="hidden lg:flex items-center gap-4 w-[60%] border-1 shadow-md rounded-2xl p-1">
        <div className="flex items-center gap-2">
          <FaLocationDot className="text-red-600" />
          <select className="text-base font-semibold">
            <option value="">Surat</option>
          </select>
        </div>
        <div className="flex-grow">
          <Input className="border-0" placeholder="Search for restaurant, cuisine or a dish" />
        </div>
      </div>
      {/* Dark/light mode  */}
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
      {/* Right-side Auth */}
      <div className="gap-2 hidden lg:flex items-center">
        {!isAuthenticated ? (
          <>
            <Button onClick={() => { setAuthType("login"); setAuthOpen(true); }}>Login</Button>
            <Button onClick={() => { setAuthType("signup"); setAuthOpen(true); }}>Sign Up</Button>
          </>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>View Profile </AvatarFallback>
              </Avatar>

            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col space-y-4">
                <div>
                  <Label>Full Name:</Label>
                  <Input className="mt-1" value={session.user.name ?? ""} readOnly />
                </div >
                <div>
                  <Label >Email Address:</Label>
                  <Input className="mt-1" value={session.user.email ?? ""} readOnly />
                </div>
                <Button variant="destructive" onClick={() => signOut()}>
                  Sign out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        open={authOpen}
        type={authType}
        onClose={() => setAuthOpen(false)}
      />

      {/* Mobile Hamburger */}
      <div className="lg:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm w-[90%]">
            {!isAuthenticated ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <h2 className="text-xl font-bold">Welcome to Zomato</h2>
                <Button className="w-full" onClick={() => { setAuthType("login"); setAuthOpen(true); }}>
                  Log in
                </Button>
                <Button className="w-full" variant="outline" onClick={() => { setAuthType("signup"); setAuthOpen(true); }}>
                  Sign up
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <div>
                  <Label>Full Name:</Label>
                  <Input value={session.user.name ?? ""} readOnly />
                </div>
                <div>
                  <Label>Email Address:</Label>
                  <Input value={session.user.email ?? ""} readOnly />
                </div>
                <Button variant="destructive" onClick={() => signOut()}>
                  Sign out
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
