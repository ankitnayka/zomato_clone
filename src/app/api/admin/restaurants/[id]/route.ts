import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const {
      name,
      address,
      phoneNumber,
      openTime,
      closeTime,
      imageUrl,
      ratings,
      ratingCount,
    } = body;

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id },
      data: {
        name,
        address,
        phoneNumber,
        openTime,
        closeTime,
        imageUrl,
        ratings,
        ratingCount,
      },
    });

    return NextResponse.json(updatedRestaurant);
  } catch (error) {
    console.error("[RESTAURANT_UPDATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
