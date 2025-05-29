import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const favorites = await prisma.recipe.findMany({
        where: { favorite: true },
    });

    return NextResponse.json(favorites);
}
