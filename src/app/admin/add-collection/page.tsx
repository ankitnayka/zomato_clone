import AddCollection from "@/components/Admin/components/AddCollection";

export default async function AddDishPage() {

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add New Collection</h1>
        <AddCollection/>
    </div>
  );
}