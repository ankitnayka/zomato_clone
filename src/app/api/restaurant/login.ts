import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const owner = await prisma.restaurantOwner.findUnique({ where: { email } });
  if (!owner) return new Response("Invalid credentials", { status: 401 });

  const match = await compare(password, owner.password);
  if (!match) return new Response("Invalid credentials", { status: 401 });

  const token = jwt.sign({ id: owner.id, email: owner.email }, process.env.JWT_SECRET!, { expiresIn: "1d" });

  return Response.json({ token });
}
