import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Optional: Reject non-JSON bodies
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json({ message: "Invalid content type" }, { status: 400 });
    }

    const body = await req.json();
    const { name, slug, imageUrl } = body;

    const validImageUrl = typeof imageUrl === "string" ? imageUrl : null;

    const collection = await prisma.collection.create({
      data: {
        name,
        slug,
        imageUrl: validImageUrl,
      },
    });

    console.log("Collection created");
    return NextResponse.json({
      message: "Collection successfully created!",
      collection,
    });
  } catch (error) {
    console.error("[COLLECTION_POST_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to create collection" },
      { status: 500 }
    );
  }
}


// import prisma from "@/lib/prismadb";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const { name, slug, imageUrl } = body;

       
//         const collection = await prisma.collection.create({
//             data: {
//                 name,
//                 slug,
//                 imageUrl
//             }
//         })

//         console.log("Collection created ")
//         return NextResponse.json({
//             message: "Collection successfully Created !!!",
//             collection
//         })
//     } catch (error) {
//         console.error('[COLLECTION_POST_ERROR]', error)
//         return NextResponse.json({ message: 'Failed to create collection' }, { status: 500 })
//     }
// }