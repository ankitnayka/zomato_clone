import  prisma  from "@/lib/prismadb";
import RestaurantDetails from "@/components/RestaurantDetails";

export default async function RestaurantPage({ params }: { params: { id: string } }) {
 

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: params.id },
   

  }
);
  

  if (!restaurant) return <div>Resturant  not found</div>;

  return <RestaurantDetails  restaurant={restaurant} />;
}
