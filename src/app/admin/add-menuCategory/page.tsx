// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import { redirect } from "next/navigation";
import RestaurantMenuCategoryManager from "@/components/Admin/components/RestaurantMenuCategoryManager";
import { getRestaurantsWithMenuData } from "@/app/actions/getRestaurants";

export default async function DashboardPage() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return redirect("/login");
  // }

   const  restaurants = await getRestaurantsWithMenuData();

  return <div className="p-4">
<RestaurantMenuCategoryManager restaurants={restaurants} />

  </div>;
}
