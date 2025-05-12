import { getAllRestaurants } from "@/app/actions/getRestaurants";
import RestaurantCard from "./RestaurantCard";

export default async function RestaurantList() {
  const restaurants = await getAllRestaurants();

  console.log("resturant...",restaurants)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-16">
      {restaurants.map((rest) => (
        <RestaurantCard
          key={rest.id}
          imageUrl={rest.imageUrl!}
          name={rest.name}
          cuisines={rest.cuisines.map(c => c.name)}
          address={rest.address}
          rating={rest.ratings || 0}
          priceForTwo="₹500 for two"
          distance="2.2 km"
          slug={rest.id}
        />
      ))}
    </div>
  );
}
