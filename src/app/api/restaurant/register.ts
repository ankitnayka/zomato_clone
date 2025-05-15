import { hash } from "bcryptjs";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existing = await prisma.restaurantOwner.findUnique({ where: { email } });
  if (existing) return new Response("Email already in use", { status: 400 });

  const hashedPassword = await hash(password, 10);

  const owner = await prisma.restaurantOwner.create({
    data: { name, email, password: hashedPassword },
  });

  return Response.json(owner);
}
