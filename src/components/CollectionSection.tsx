import { CollectionCard } from "./CollectionCard";

const collections = [
  {
    title: "Unmissable Gujarati Delicacies",
    image: "/gujarati.jpg",
    places: 11,
  },
  {
    title: "Great Cafes",
    image: "/hydrabad.jpg",
    places: 13,
  },
  {
    title: "Local Favourite Places",
    image: "/marathi.jpg",
    places: 8,
  },
  {
    title: "Serene Rooftop Places",
    image: "/punjabi.jpg",
    places: 5,
  },
];

export function CollectionSection() {
  return (
    <section className="my-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Collections</h2>
          <p className="text-sm text-gray-600">
            Explore curated lists of top restaurants, cafes, pubs, and bars in Surat
          </p>
        </div>
        <button className="text-sm text-rose-500 hover:underline">
          All collections in Surat →
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {collections.map((col, idx) => (
          <CollectionCard key={idx} {...col} />
        ))}
      </div>
    </section>
  );
}
