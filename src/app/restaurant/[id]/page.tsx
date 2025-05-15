import prisma from "../../../lib/prismadb";
import RestaurantDetails from "@/components/RestaurantDetails";

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: params.id },
    include: {
      menuCategories: true,
      dishes: true,
    },
  });
  console.log("single restaurant",restaurant)
  if (!restaurant) return <div>Restaurant not found</div>;

  return <RestaurantDetails restaurant={restaurant} />;
}



