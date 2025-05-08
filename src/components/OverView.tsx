"use client";
import Image from "next/image";


interface OverviewProps {
  restaurant: {
    cuisines: { id: string; name: string }[];
    menuImages: string[];
  };
}
export default function OverviewSection({ restaurant }: OverviewProps) {
  const { cuisines = [], menuImages = [] } = restaurant;

  const imageWrapperClass =
    menuImages.length === 2
      ? "flex gap-4 flex-wrap md:flex-nowrap"
      : "flex flex-wrap gap-4";

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Cuisines-</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {cuisines.map((cuisine) => (
          <span
            key={cuisine.id}
            className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
          >
            {cuisine.name}
          </span>
        ))}
      </div>

      {menuImages.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">Menu</h2>
          <div className={imageWrapperClass}>
            {menuImages.map((img: string, idx: number) => (
              <div key={idx} className="w-full md:w-1/2">
                <Image
                  src={img}
                  alt={`Menu ${idx + 1}`}
                  width={200}
                  height={200}
                  className="rounded shadow"
                />
                  <p className="text-sm text-gray-600 mt-1">
                {idx === 0 ? "Food Menu" : "Beverages"}
              </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
