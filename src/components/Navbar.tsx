'use client';

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaLocationDot } from "react-icons/fa6";
import { Menu } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import AuthModal from "./AuthModal";
import Link from "next/link";

const Navbar = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  return (
    <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between border-b">
      {/* Logo */}
      <div className="text-3xl font-extrabold text-rose-500 w-[20%]">
        <Link href={"/"}>
          Zomato
        </Link>
      </div>

      {/* Large screen (md and above) Search + Location + Auth */}
      <div className="hidden lg:flex items-center  gap-4 w-[60%] border-1 shadow-md rounded-2xl p-1">
        <div className="flex items-center gap-2 ">
          <FaLocationDot className="text-red-600" />
          <select className="text-base font-semibold">
            <option value="">Surat</option>
          </select>
        </div>
        <div className="flex-grow">
          <Input className="border-0" placeholder="Search for restaurant, cuisine or a dish" />
        </div>

      </div>
      <div className=" gap-2 hidden lg:flex items-center">
        <Button onClick={() => { setAuthType("login"); setAuthOpen(true); }}>Login</Button>
        <Button onClick={() => { setAuthType("signup"); setAuthOpen(true); }}>Sign Up</Button>
      </div>
      <AuthModal
        open={authOpen}
        type={authType}
        onClose={() => setAuthOpen(false)}
      />

      {/* Mobile Hamburger Button */}
      <div className="lg:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm w-[90%]">
            <div className="flex flex-col items-center gap-4 py-4">
              <h2 className="text-xl font-bold">Welcome to Zomato</h2>
              <Button className="w-full">Log in</Button>
              <Button className="w-full" variant="outline">Sign up</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
