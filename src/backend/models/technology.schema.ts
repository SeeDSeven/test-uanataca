// backend/models/technology.schema.ts
import { z } from 'zod';

const CategoryEnum = z.enum([
  'frontend', 'backend', 'devops', 'data', 'mobile', 'testing', 'other'
]);

export const createTechnologySchema = z.object({
  name: z.string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(80, { message: "El nombre no puede tener más de 80 caracteres." }),
  description: z.string()
    .max(500, { message: "La descripción no puede tener más de 500 caracteres." })
    .optional(),
  website: z.string()
    .url({ message: "Debe ser una URL válida." })
    .optional()
    .or(z.literal('')), // Permite un string vacío
  category: CategoryEnum,
});

export const updateTechnologySchema = createTechnologySchema.partial(); // Todos los campos son opcionales en la actualización