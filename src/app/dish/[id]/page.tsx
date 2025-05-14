import  prisma  from "../../../lib/prismadb";
import RestaurantDetails from "@/components/RestaurantDetails";

export default async function DishPage({ params }: { params: { id: string } }) {
 

  const dish = await prisma.dish.findUnique({
    where: { id: params.id },
    include: {
      restaurant: {
        include: {
          cuisines: true,
          menuCategories: {
            include: {
              items: true
            }
          },
          dishes: true // Optional: include this if findMany includes dishes
        }
      },
      collection: true // Optional: include if you also want collection details
    }
  });
  
  

  if (!dish) return <div>Dish not found</div>;

  return <RestaurantDetails dish={dish} restaurant={dish.restaurant} />;
}
