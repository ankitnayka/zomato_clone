
import RestaurantList from "@/components/RestaurantList";
import { CollectionSection } from "@/components/CollectionSection";
import FilterPills from "@/components/FilterPills";
import ExploreOptions from "@/components/ExploreOptions";


export default function Home() {
  return (
    <div>

      <div className="max-w-7xl mx-auto">
        <CollectionSection />
        <FilterPills />
        <RestaurantList />
        {/* <ExploreOptions data={null} /> */}
      </div>

    </div>
  );
}
