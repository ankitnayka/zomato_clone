// app/api/admin/restaurants/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    //   const formData = await req.formData();

    //   const name = formData.get("name") as string ;
    //   const address = formData.get("address") as string;
    //   const phoneNumber = formData.get("phoneNumber") as string;
    //   const openTime = formData.get("openTime") as string;
    //   const closeTime = formData.get("closeTime") as string;

    //   // TODO: handle file upload properly
    //   const imageFile = formData.get("image") as File;
    //   const imageUrl = imageFile ? "/placeholder.jpg" : undefined; // or handle cloud upload

    const body = await req.json()
    const { name, address, phoneNumber, openTime, closeTime, imageUrl } = body;

    if (!name || !address) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newRestaurant = await prisma.restaurant.create({
        data: {
            name,
            address,
            phoneNumber,
            openTime,
            closeTime,
            imageUrl,
        },
    });

    return NextResponse.json(newRestaurant, { status: 201 });
}
