import prisma from '../../../../lib/prismadb';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CollectionPage({ params }: { params: { slug: string } }) {
    const collection = await prisma.collection.findUnique({
        where: { slug: params.slug },
        include: {
            dishes: {
                include: {
                    restaurant: true,
                },
            },
        },
    });

    if (!collection) return notFound();

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{collection?.name} </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.dishes.map((dish) => (
                    <Link href={`/dish/${dish.id}`}>
                        <div key={dish.id} className="border rounded-lg p-4 shadow">
                            <Image
                                src={dish.imageUrl || '/placeholder.jpg'}
                                alt={dish.name}
                                width={400}
                                height={250}
                                className="rounded w-full object-cover h-48"
                            />
                            <h2 className="text-xl font-semibold mt-2">{dish?.name}</h2>
                            <p className="text-gray-600">By {dish?.restaurant?.name}</p>
                            <p className="text-rose-500 font-bold mt-1">₹{dish.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
