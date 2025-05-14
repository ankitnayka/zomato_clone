import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create user
  await prisma.user.create({
    data: {
      name: "Ankit Kumar",
      email: "ankit@example.com",
      password: "hashed-password",
      
    },
  });

  // Upsert cuisines
  const cuisineNames = ["Indian", "Chinese", "Italian"];
  const cuisines = await Promise.all(
    cuisineNames.map((name) =>
      prisma.cuisine.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  // Create restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Tandoori Palace",
      address: "123 Spice Road, Mumbai",
      imageUrl: "https://source.unsplash.com/400x300/?restaurant,indian",
      phoneNumber: "9876543210",
      openTime: "10:00 AM",
      closeTime: "11:00 PM",
      ratings: 4.4,
      ratingCount: 280,
      cuisines: {
        connect: cuisines.map((c) => ({ id: c.id })),
      },
    },
  });

  // Create collection
  const collection = await prisma.collection.create({
    data: {
      name: "Chef’s Picks",
      slug: "chefs-picks",
      imageUrl: "https://source.unsplash.com/400x300/?chef,dishes",
    },
  });

  // Create dishes
  await prisma.dish.createMany({
    data: [
      {
        name: "Paneer Lababdar",
        price: 260,
        imageUrl: "https://source.unsplash.com/400x300/?paneera",
        restaurantId: restaurant.id,
        collectionId: collection.id,
      },
      {
        name: "Hakka Noodles",
        price: 200,
        imageUrl: "https://source.unsplash.com/400x300/?noodlesa",
        restaurantId: restaurant.id,
        collectionId: collection.id,
      },
    ],
  });

  // Create menu categories and items
  const category1 = await prisma.menuCategory.create({
    data: {
      name: "Main Course",
      count: 2,
      restaurantId: restaurant.id,
      items: {
        create: [
          {
            name: "Butter Chicken",
            price: 320.5,
            tag: "Chef's Special",
          },
          {
            name: "Shahi Paneer",
            price: 280.0,
          },
        ],
      },
    },
  });

  const category2 = await prisma.menuCategory.create({
    data: {
      name: "Desserts",
      count: 2,
      restaurantId: restaurant.id,
      items: {
        create: [
          {
            name: "Rasmalai",
            price: 120.0,
          },
          {
            name: "Gulab Jamun",
            price: 90.0,
            tag: "Today Special",
          },
        ],
      },
    },
  });

  console.log("✅ Seed completed successfully");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
