"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type AuthFormProps = {
  type: "login" | "signup";
};

export const AuthForm = ({ type }: AuthFormProps) => {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (type === "login") {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      console.log("Responses",res)
      if (res?.ok) {
        router.refresh();
        router.push("/"); 
        toast.success("Log in successfully !!! ");
      } else {

        alert("Login failed");
      }
    }

    if (type === "signup") {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success(data?.message);
          // alert("Registered! Please log in.");
        } else {
          // alert("Signup failed");
          toast.error(data?.message);
        }
      } catch (err) {
        console.error(err);
      }
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md w-full mx-auto"
    >
      {type === "signup" && (
        <Input
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      )}
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Please wait..." : type === "login" ? "Log In" : "Sign Up"}
      </Button>
    </form>
  );
};
