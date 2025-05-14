// app/actions/getRestaurants.ts
'use server'

import  prisma  from "../../lib/prismadb";

export async function getAllRestaurants() {
  return await prisma.restaurant.findMany({
    include: {
      cuisines: true,
    },
    orderBy: {
      ratings: "desc",
    },
  });
}



export async function getRestaurants() {
  // return await prisma.restaurant.findMany()
  return await prisma.restaurant.findMany({
  include: {
    dishes: true,
    cuisines: true,
    menuCategories: {
      include: {
        items: true, 
      },
    },
  },
});

}
