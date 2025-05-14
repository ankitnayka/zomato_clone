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

// export async function getRestaurants() {
// //   return await prisma.restaurant.findMany({
// //   include: {
// //     dishes: true,
// //     cuisines: true,
// //     menuCategories: true,
// //   },
// // });

//  return await prisma.restaurant.findUnique({
//   where: {
//     id: "RESTAURANT_ID_HERE", // Replace with actual restaurant ID
//   },
//   include: {
//     menuCategories: true,
//     dishes: {
//       include: {
//         collection: true,
//         menuCategory: true,
//       },
//     },
//   },
// });

// }



export async function getRestaurantsWithMenuData() {
  return await prisma.restaurant.findMany({
    include: {
      menuCategories: true,
      dishes: {
        include: {
          collection: true,
          menuCategory: true,
        },
      },
    },
  });
}



