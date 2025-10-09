// src/app/api/technologies/[id]/route.ts
import { technologyController } from "@/backend/controllers/technology.controller";
import { NextRequest, NextResponse } from "next/server";

// Definimos el tipo para el segundo argumento 'context' que nos da Next.js
interface RouteContext {
  params: { id: string };
}

const parseId = (id: string) => {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        throw new Error("El ID debe ser un número válido.");
    }
    return parsedId;
}

export async function GET(req: NextRequest, context: RouteContext) {
    try {
        const id = parseId(context.params.id); 
        return technologyController.getById(id);
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 400 });
    }
}

export async function PUT(req: NextRequest, context: RouteContext) {
    try {
        const id = parseId(context.params.id); 
        return technologyController.update(req, id);
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
    try {
        const id = parseId(context.params.id); 
        return technologyController.delete(id);
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 400 });
    }
}