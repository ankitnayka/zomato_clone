// components/AddRestaurantForm.tsx

"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type FormValues = {
  name: string;
  address: string;
  image: FileList;
  phoneNumber?: string;
  openTime?: string;
  closeTime?: string;
};

export default function AddRestaurantForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();


  const router = useRouter();
  const [error, setError] = useState("");
  const [imageUrl,setImageUrl]=useState<string | null>(null)
    const imageWatch = watch("image");

  const uploadImageToCloudinary=async(file:File)=>{
        const formData=new FormData();
        formData.append("file",file);
        formData.append("upload_preset","restaurant_upload")

        const res =await fetch(`https://api.cloudinary.com/v1_1/dkfh75ar0/image/upload`,
            {
                method:"POST",
                body:formData
            }
        )

        const data =await res.json();
        return data.secure_url;
  }

  const onSubmit = async (data: FormValues) => {
    setError("");
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("address", data.address);
    // formData.append("phoneNumber", data.phoneNumber || "");
    // formData.append("openTime", data.openTime || "");
    // formData.append("closeTime", data.closeTime || "");

    // if (data.imageUrl && data.imageUrl[0]) {
    //   formData.append("image", data.imageUrl[0]);
    // }

    let uploadedImageUrl="";

    if(data.image && data.image[0]){
        uploadedImageUrl=await uploadImageToCloudinary(data.image[0]);
    }

    const payload = {
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        openTime: data.openTime,
        closeTime: data.closeTime,
        imageUrl: uploadedImageUrl,
      };
    try {
      const res = await fetch("/api/admin/restaurants", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || "Failed to add restaurant.");
      }

      reset(); // reset form
      router.refresh();
    //   alert("Restaurant added!");
      toast.success(`${data.name} Restaurnat successfully Added !!!`)
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-5"
    >
      <h2 className="text-xl font-bold">Add New Restaurant</h2>

      {/* Restaurant  Name */}
      <div>
        <label className="block text-sm font-medium"> Restaurant Name *</label>
        <input
          type="text"
          {...register("name", { required: "Restaurant name  is required" })}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/*Restaurant Address */}
      <div>
        <label className="block text-sm font-medium">Address </label>
        <input
          type="text"
          {...register("address", { required: "Restaurant Address is required" })}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium">Restaurant Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="mt-1 block w-full"
        />
      </div>

      {/* Phone number */}
      <div>
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="text"
          {...register("phoneNumber")}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      {/* Time Picker */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Open Time</label>
          <input
            type="time"
            {...register("openTime")}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Close Time</label>
          <input
            type="time"
            {...register("closeTime")}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Submitting..." : "Add Restaurant"}
      </button>
    </form>
  );
}
