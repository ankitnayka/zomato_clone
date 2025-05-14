// app/actions/fetchDishMetadata.ts
'use server';

import  prisma  from '@/lib/prismadb';

export async function fetchDishMetadata() {
  const [restaurants, collections] = await Promise.all([
    prisma.restaurant.findMany({ select: { id: true, name: true } }),
    prisma.collection.findMany({ select: { id: true, name: true } }),
  ]);

  return { restaurants, collections };
}
