// app/admin/add-dish/page.tsx
import { fetchDishMetadata } from '@/app/actions/fetchDishMetadata';
import { getRestaurants } from '@/app/actions/getRestaurants';
import AddDishForm from '@/components/Admin/components/AddDishForm';



export default async function AddDishPage() {
  const { restaurants, collections } = await fetchDishMetadata();
// const restaurant = await getRestaurants()
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add New Dish</h1>
      <AddDishForm restaurants={restaurants} collections={collections}  />
    </div>
  );
}
