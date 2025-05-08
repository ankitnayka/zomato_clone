
import RestaurantList from "@/components/AllRestaurants";
import { CollectionSection } from "@/components/CollectionSection";
import FilterPills from "@/components/FilterPills";


export default function Home() {
  return (
   <div>
     
     <div className="max-w-7xl mx-auto">
     <CollectionSection/>
     <FilterPills/>
     <RestaurantList />
     </div>
    
   </div>
  );
}
