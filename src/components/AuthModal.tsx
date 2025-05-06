"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AuthForm } from "./AuthForm";

interface AuthModalProps {
  open: boolean;
  type: "login" | "signup";  
  onClose: () => void;
}

export default function AuthModal({ open, type, onClose }: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{type === "login" ? "Login" : "Sign Up"}</DialogTitle>
        </DialogHeader>
        <AuthForm type={type} />
      </DialogContent>
    </Dialog>
  );
}
