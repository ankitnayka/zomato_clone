import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface RestaurantCardProps {
  imageUrl: string;
  name: string;
  cuisines: string[];
  address: string;
  discount?: string;
  rating: number;
  priceForTwo: string;
  distance: string;
  closingTime?: string;
  slug: string; // for detail page link
}

export default function RestaurantCard({
  imageUrl,
  name,
  cuisines,
  address,
  discount,
  rating,
  priceForTwo,
  distance,
  closingTime,
  slug,
}: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${slug}`} className="block">
      <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border">
        <div className="relative w-full h-40">
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
          {discount && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {discount}
            </div>
          )}
        </div>

        <div className="p-3 space-y-1">
          <h3 className="font-semibold text-sm">{name}</h3>
          <p className="text-xs text-gray-600 truncate">
            {cuisines.join(", ")}
          </p>
          <p className="text-xs text-gray-500 truncate">{address}</p>
          {closingTime && (
            <p className="text-xs text-red-600">Closes in {closingTime}</p>
          )}

          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-gray-800 font-medium">{priceForTwo}</span>
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <Star size={14} fill="currentColor" />
              {rating}
            </div>
          </div>
          <p className="text-xs text-gray-400">{distance}</p>
        </div>
      </div>
    </Link>
  );
}
