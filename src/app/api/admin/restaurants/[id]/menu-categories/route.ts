// /api/restaurants/[id]/menu-categories/route.ts
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const categories = await prisma.menuCategory.findMany({
    where: { restaurantId: params.id },
  });

  return NextResponse.json(categories);
}
