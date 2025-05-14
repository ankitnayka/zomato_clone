// /api/menu-categories/route.ts
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, count, restaurantId } = await req.json();

  if (!name || !restaurantId) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const category = await prisma.menuCategory.create({
    data: {
      name,
      count: Number(count) || 0,
      restaurantId,
    },
  });

  return NextResponse.json(category);
}
