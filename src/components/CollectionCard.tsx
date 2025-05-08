// components/CollectionCard.tsx
import Image from "next/image";



export function CollectionCard({ image, title }) {
  return (
    <div className="min-w-[250px] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-gray-500"> Places</p>
      </div>
    </div>
  );
}
