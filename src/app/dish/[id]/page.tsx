import  prisma  from "@/lib/prismadb";
import RestaurantDetails from "@/components/RestaurantDetails";

export default async function DishPage({ params }: { params: { id: string } }) {
 

  const dish = await prisma.dish.findUnique({
    where: { id: params.id },
    include: {
      restaurant: {
        include: {
          cuisines: true,
          menuCategories:{
            include:{
              items:true
            }
          }
        }
      }
    }
  });
  

  if (!dish) return <div>Dish not found</div>;

  return <RestaurantDetails dish={dish} restaurant={dish.restaurant} />;
}
