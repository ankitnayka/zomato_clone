// app/actions/addDish.ts
'use server';

import  prisma  from '@/lib/prismadb';

type DishInput = {
  name: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
  collectionId: string;
};

export async function addDish(data: DishInput) {
  const dish = await prisma.dish.create({
    data: {
      name: data.name,
      price: data.price,
      imageUrl: data.imageUrl,
      restaurantId: data.restaurantId,
      collectionId: data.collectionId,
    },
  });

  return dish;
}
