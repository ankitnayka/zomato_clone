'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

type DishFormData = {
  name: string;
  price: number;
  imageUrl: FileList;
  restaurantId: string;
  collectionId: string;
  menuCategoryId: string;
};

type Props = {
  restaurants: {
    id: string;
    name: string;
    collections: { id: string; name: string }[];
    menuCategories: { id: string; name: string }[];
  }[];

  collection:{
    id:string;
    name:string;
    slug:string;
    imageUrl:string;
    dishes:string[];
  }[]

};

export default function AddDishForm({ restaurants,collection }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<DishFormData>();

  console.log("Collection Data",collection);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedRestaurantId = watch("restaurantId");
  const selectedRestaurant = restaurants.find(
    (res) => res.id === selectedRestaurantId
  );

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "restaurant_upload");

    const res = await fetch("https://api.cloudinary.com/v1_1/dkfh75ar0/image/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    return data.secure_url;
  };

  const onSubmit = async (data: DishFormData) => {
    setError("");
    setLoading(true);

    let uploadImageUrl = "";
    if (data.imageUrl && data.imageUrl[0]) {
      uploadImageUrl = await uploadImageToCloudinary(data.imageUrl[0]);
    }

    const payload = {
      name: data.name,
      price: data.price,
      imageUrl: uploadImageUrl,
      restaurantId: data.restaurantId,
      collectionId: data.collectionId,
      menuCategoryId: data.menuCategoryId
    };
    const res = await fetch("/api/admin/add-dishes", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      // alert("Dish added!");
      toast.success(`${data.name} Dish added successfully`)
      reset();
    } else {
      alert("Failed to add dish");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md p-4 dark:bg-gray-800 dark:text-white">
      <input {...register("name")} placeholder="Dish Name" required className="border p-2 w-full" />
      <input type="number" {...register("price")} placeholder="Price" required className="border p-2 w-full" />
      <input type="file" {...register("imageUrl")} required className="border p-2 w-full" />

      <select {...register("restaurantId")} required className="border p-2 w-full">
        <option value="">Select Restaurant</option>
        {restaurants.map((res) => (
          <option key={res.id} value={res.id}>
            {res.name}
          </option>
        ))}
      </select>
      <select {...register("collectionId")}  className="border p-2 w-full">
        <option value="">Select Collection</option>
        {collection.map((col) => (
          <option key={col.id} value={col.id}>
            {col.name}
          </option>
        ))}
      </select>
      <select {...register("menuCategoryId")} required className="border p-2 w-full">
        <option value="">Select Menu Category</option>
        {selectedRestaurant?.menuCategories?.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Adding..." : "Add Dish"}
      </button>
    </form>
  );
}


// 'use client';

// import { useForm } from 'react-hook-form';
// import { useState } from 'react';

// type DishFormData = {
//   name: string;
//   price: number;
//   imageUrl: FileList;
//   restaurantId: string;
//   collectionId: string;
// };

// type Props = {
//   restaurants: { id: string; name: string }[];
//   collections: { id: string; name: string }[];
// };

// export default function AddDishForm({ restaurants, collections }: Props) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors, isSubmitting }
//   } = useForm<DishFormData>();

//   // console.log("Restaurant Details",restaurants)

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const imageUrl = watch("imageUrl")

//   const uploadImageToCloudinary = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "restaurant_upload");
//     const res = await fetch(`https://api.cloudinary.com/v1_1/dkfh75ar0/image/upload`,
//       {
//         method: "POST",
//         body: formData
//       }
//     )
//     const data = await res.json();
//     return data.secure_url;
//   }


//   const onSubmit = async (data: DishFormData) => {
//     setError("")
//     setLoading(true);


//     let uploadImageUrl = "";

//     if (data.imageUrl && data.imageUrl[0]) {
//       uploadImageUrl = await uploadImageToCloudinary(data.imageUrl[0])
//     }

//     const payload = {
//       name: data.name,
//       price: data.price,
//       imageUrl: data.imageUrl,
//       restaurantId: data.restaurantId,
//       collectionId: data.collectionId
//     }

//     const res = await fetch('/api/admin/add-dishes', {
//       method: 'POST',
//       body: JSON.stringify(payload),
//     });

//     console.log(res)
//     if (res.ok) {
//       alert('Dish added!');
//       reset();
//     } else {
//       alert('Failed to add dish');
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <input {...register('name')} placeholder="Dish Name" required />
//       <input type="number" {...register('price')} placeholder="Price" required />
//       <input type='file' {...register('imageUrl')} placeholder="Image URL" required />

//       <select {...register('restaurantId')} required>
//         <option value="">Select Restaurant</option>
//         {restaurants.map((res) => (
//           <option key={res.id} value={res.id}>
//             {res.name}
//           </option>
//         ))}
//       </select>

//       <select {...register('collectionId')} required>
//         <option value="">Select Collection</option>
//         {collections.map((col) => (
//           <option key={col.id} value={col.id}>
//             {col.name}
//           </option>
//         ))}
//       </select>

//       <select {...register('collectionId')} required>
//         <option value="">Select Collection</option>
//         {restaurants.map((col) => (
//           <option key={col.id} value={col.id}>
//             {col.name}
//           </option>
//         ))}
//       </select>
      

//       <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
//         {loading ? 'Adding...' : 'Add Dish'}
//       </button>
//     </form>
//   );
// }
