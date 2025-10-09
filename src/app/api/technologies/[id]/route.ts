// app/api/technologies/[id]/route.ts
import { technologyController } from "@/backend/controllers/technology.controller";
import { NextRequest } from "next/server";

interface RouteParams {
  params: { id: string };
}

const parseId = (id: string) => {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        throw new Error("El ID debe ser un número válido.");
    }
    return parsedId;
}

// Obtener una tecnología por ID
export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const id = parseId(params.id);
        return technologyController.getById(id);
    } catch (error) {
        return new Response(JSON.stringify({ message: (error as Error).message }), { status: 400 });
    }
}

// Actualizar una tecnología por ID
export async function PUT(req: NextRequest, { params }: RouteParams) {
    try {
        const id = parseId(params.id);
        return technologyController.update(req, id);
    } catch (error) {
        return new Response(JSON.stringify({ message: (error as Error).message }), { status: 400 });
    }
}

// Eliminar una tecnología por ID
export async function DELETE(req: NextRequest, { params }: RouteParams) {
    try {
        const id = parseId(params.id);
        return technologyController.delete(id);
    } catch (error) {
        return new Response(JSON.stringify({ message: (error as Error).message }), { status: 400 });
    }
}