'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Restaurant = {
  id: string;
  name: string;
};

type MenuCategory = {
  id: string;
  name: string;
  count: number;
};

type FormData = {
  name: string;
  count: number;
};

type Props = {
  restaurants: Restaurant[];
};

export default function RestaurantMenuCategoryManager({ restaurants }: Props) {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedRestaurantId) {
      fetch(`/api/restaurants/${selectedRestaurantId}/menu-categories`)
        .then(res => res.json())
        .then(data => setMenuCategories(data))
        .catch(err => console.error("Failed to fetch menu categories", err));
    } else {
      setMenuCategories([]);
    }
  }, [selectedRestaurantId]);

  const onSubmit = async (data: FormData) => {
    if (!selectedRestaurantId) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/menu-category', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          restaurantId: selectedRestaurantId,
        }),
      });

      if (res.ok) {
        const newCategory = await res.json();
        setMenuCategories(prev => [...prev, newCategory]);
        reset();
        toast.success("Menu-Category created successfully !!!")
      } else {
        console.error("Failed to add menu category");
        toast.error("Failed to create Menu-Category !!!")
      }
    } catch (error) {
      console.error("Error creating category", error);
      toast.error("something went wrong !!!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold">Manage Menu Categories</h2>

      <select
        className="w-full border px-3 py-2 rounded-md"
        value={selectedRestaurantId}
        onChange={(e) => setSelectedRestaurantId(e.target.value)}
      >
        <option value="">Select Restaurant</option>
        {restaurants.map((rest) => (
          <option key={rest.id} value={rest.id}>{rest.name}</option>
        ))}
      </select>

      {selectedRestaurantId && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name', { required: true })}
            placeholder="Category Name"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            {...register('count', { valueAsNumber: true })}
            placeholder="Item Count"
            type="number"
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Adding...' : 'Add Menu Category'}
          </button>
        </form>
      )}

      {menuCategories.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mt-4">Menu Categories</h3>
          <ul className="list-disc list-inside space-y-1">
            {menuCategories.map((cat) => (
              <li key={cat.id}>
                {cat.name} ({cat.count} items)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
