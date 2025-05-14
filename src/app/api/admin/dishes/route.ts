// app/api/dishes/route.ts
import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prismadb';

export async function POST(req: Request) {
  const body = await req.json();

  const { name, price, imageUrl, restaurantId, collectionId } = body;
    console.log("Testing ankit nayka ",name,price,restaurantId,collectionId)
  const dish = await prisma.dish.create({
    data: {
      name,
      price:Number(price),
      imageUrl,
      restaurantId,
      collectionId,
    },
  });

  return NextResponse.json(dish);
}
