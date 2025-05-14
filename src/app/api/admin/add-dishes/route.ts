// app/api/dishes/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, imageUrl, restaurantId, collectionId, menuCategoryId } = body;

    console.log("Received:", { name, price, imageUrl, restaurantId, collectionId, menuCategoryId });

    if (!name || !price || !restaurantId || !collectionId || !menuCategoryId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const dish = await prisma.dish.create({
      data: {
        name,
        price: Number(price),
        imageUrl: typeof imageUrl === "string" ? imageUrl : null,
        restaurantId,
        collectionId,
        menuCategoryId,
      },
    });

    return NextResponse.json(dish);
  } catch (error) {
    console.error("[DISH_POST_ERROR]", error);
    return NextResponse.json({ message: "Failed to create dish" }, { status: 500 });
  }
}



// // app/api/dishes/route.ts
// import { NextResponse } from 'next/server';
// import  prisma  from '@/lib/prismadb';

// export async function POST(req: Request) {
//   const body = await req.json();

//   const { name, price, imageUrl, restaurantId, collectionId } = body;
//     console.log("Testing ankit nayka ",name,price,restaurantId,collectionId)

//      const imageUrlString =
//       typeof imageUrl === 'string'
//         ? imageUrl
//         : imageUrl?.url ?? null
//   const dish = await prisma.dish.create({
//     data: {
//       name,
//       price:Number(price),
//       imageUrl:imageUrlString,
//       restaurantId,
//       collectionId,

//     },
//   });

//   return NextResponse.json(dish);
// }
