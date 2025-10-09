// app/api/technologies/route.ts
import { technologyController } from "@/backend/controllers/technology.controller";
import { NextRequest } from "next/server";

// Obtener todas las tecnologías
export async function GET() {
  return technologyController.getAll();
}

// Crear una nueva tecnología
export async function POST(req: NextRequest) {
  return technologyController.create(req);
}
