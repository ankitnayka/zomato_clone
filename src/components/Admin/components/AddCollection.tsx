'use client'

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';



type FormData = {
    name: string;
    slug: string;
    imageUrl?: FileList
}

export default function AddCollection() {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const imageUrl = watch("imageUrl");

  

    const uploadImageToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "restaurant_upload");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dkfh75ar0/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error?.message || "Upload failed");
            return data.secure_url; 
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw error;
        }
    };

    const onSubmit = async (data: FormData) => {
        setError("");
        setLoading(true);
        let uploadImageUrl = "";
               
        
        try {
            if (data.imageUrl && data.imageUrl[0]) {
                uploadImageUrl = await uploadImageToCloudinary(data.imageUrl[0])
            }
            console.log("Data",uploadImageUrl)

            const payload = {
                name: data.name,
                slug: data.slug,
                imageUrl: uploadImageUrl || null
            }
            const res = await fetch('/api/admin/add-collection', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            reset()
            router.refresh()
            toast.success("Collection successfully added !!!")
        } catch (error) {
            console.error('Error during creating collection', error)
            toast.error("Failed to create collection !!!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4 dark:bg-gray-800 dark:text-white"
        >
            <h2 className="text-xl font-semibold">Create New Collection</h2>

            <div>
                <label className="block font-medium">Name</label>
                <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border rounded-md "
                    disabled={loading}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
                <label className="block font-medium">Slug</label>
                <input
                    {...register('slug', { required: 'Slug is required' })}
                    className="w-full px-3 py-2 border rounded-md"
                    disabled={loading}
                />
                {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
            </div>

            <div>
                <label className="block font-medium">Image URL (optional)</label>
                <input
                    type='file'
                    {...register('imageUrl')}
                    className="w-full px-3 py-2 border rounded-md"
                    disabled={loading}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                disabled={loading}
            >
                {loading ? 'Saving...' : 'Create Collection'}
            </button>
        </form>
    )

}