'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

type DishFormData = {
  name: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
  collectionId: string;
};

type Props = {
  restaurants: { id: string; name: string }[];
  collections: { id: string; name: string }[];
};

export default function AddDishForm({ restaurants ,collections}: Props) {
  const { register, handleSubmit, reset } = useForm<DishFormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: DishFormData) => {
    setLoading(true);
    const res = await fetch('/api/admin/dishes', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    console.log(res)
    if (res.ok) {
      alert('Dish added!');
      reset();
    } else {
      alert('Failed to add dish');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('name')} placeholder="Dish Name" required />
      <input type="number" {...register('price')} placeholder="Price" required />
      <input {...register('imageUrl')} placeholder="Image URL" required />

      <select {...register('restaurantId')} required>
        <option value="">Select Restaurant</option>
        {restaurants.map((res) => (
          <option key={res.id} value={res.id}>
            {res.name}
          </option>
        ))}
      </select>

      <select {...register('collectionId')} required>
        <option value="">Select Collection</option>
        {collections.map((col) => (
          <option key={col.id} value={col.id}>
            {col.name}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? 'Adding...' : 'Add Dish'}
      </button>
    </form>
  );
}
