'use client'
import { CollectionSection } from "@/components/CollectionSection";
import FilterPills from "@/components/FilterPills";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";

export default function Home() {
  return (
   <div>
     <Navbar/>
     <Tabs/>
     <div className="max-w-7xl mx-auto">
     <CollectionSection/>
     <FilterPills/>
     </div>
    
   </div>
  );
}
