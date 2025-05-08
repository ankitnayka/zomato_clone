import Link from "next/link";
import { CollectionCard } from "./CollectionCard";
import prisma from "@/lib/prismadb";




export async function CollectionSection() {
  const collections = await prisma.collection.findMany({
    include: {
      _count: {
        select: { dishes: true },
      },
    },
  });
  return (
    <section className="my-8 px-4">
      <h2 className="text-4xl font-bold my-8 ">Collections</h2>
      <div className="flex justify-between items-center mb-4 ">
        <div>
          <p className="text-2xl text-gray-600 mb-4">
            Explore curated lists of top restaurants, cafes, pubs, and bars in Surat
          </p>
        </div>
        <button className="text-sm text-rose-500 hover:underline">
          All collections in Surat →
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {collections.map((col, idx) => (
          // <CollectionCard title={col.title} image={col.image} places={col.places} />
          <Link href={`/collection/${col.slug}`} key={col.slug}>
            <CollectionCard
              title={col.slug}
              image={col.imageUrl}
            // places={col.}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
