// backend/controllers/technology.controller.ts
import { NextRequest, NextResponse } from "next/server";
import { technologyService } from "@/backend/services/technology.service";
import { createTechnologySchema, updateTechnologySchema } from "@/backend/models/technology.schema";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

// Función para manejar errores de forma centralizada
const handleError = (error: unknown) => {
  if (error instanceof ZodError) {
    return NextResponse.json({ message: "Error de validación", errors: error.errors }, { status: 400 });
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Error de restricción única (nombre ya existe)
    if (error.code === 'P2002') {
      return NextResponse.json({ message: "El nombre de la tecnología ya existe." }, { status: 409 });
    }
    // Registro no encontrado para actualizar o eliminar
    if (error.code === 'P2025') {
      return NextResponse.json({ message: "Tecnología no encontrada." }, { status: 404 });
    }
  }
  // Error genérico del servidor
  return NextResponse.json({ message: "Error interno del servidor.", error: (error as Error).message }, { status: 500 });
};

export const technologyController = {
  // POST /api/technologies
  create: async (req: NextRequest) => {
    try {
      const body = await req.json();
      const validatedData = createTechnologySchema.parse(body);
      const newTechnology = await technologyService.create(validatedData);
      return NextResponse.json(newTechnology, { status: 201 });
    } catch (error) {
      return handleError(error);
    }
  },

  // GET /api/technologies
  getAll: async () => {
    try {
      const technologies = await technologyService.getAll();
      return NextResponse.json(technologies);
    } catch (error) {
      return handleError(error);
    }
  },

  // GET /api/technologies/[id]
  getById: async (id: number) => {
    try {
      const technology = await technologyService.getById(id);
      if (!technology) {
        return NextResponse.json({ message: "Tecnología no encontrada." }, { status: 404 });
      }
      return NextResponse.json(technology);
    } catch (error) {
      return handleError(error);
    }
  },

  // PUT /api/technologies/[id]
  update: async (req: NextRequest, id: number) => {
    try {
      const body = await req.json();
      const validatedData = updateTechnologySchema.parse(body);
      if (Object.keys(validatedData).length === 0) {
        return NextResponse.json({ message: "No se proporcionaron datos para actualizar." }, { status: 400 });
      }
      const updatedTechnology = await technologyService.update(id, validatedData);
      return NextResponse.json(updatedTechnology);
    } catch (error) {
      return handleError(error);
    }
  },

  // DELETE /api/technologies/[id]
  delete: async (id: number) => {
    try {
      await technologyService.delete(id);
      return new NextResponse(null, { status: 204 }); // 204 No Content
    } catch (error) {
      return handleError(error);
    }
  },
};