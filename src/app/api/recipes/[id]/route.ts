import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const recipe = await prisma.recipe.findUnique({
        where: { id },
    });

    return NextResponse.json(recipe);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const body = await req.json();
    const updated = await prisma.recipe.update({
        where: { id },
        data: { favorite: body.favorite },
    });

    return NextResponse.json(updated);
}
