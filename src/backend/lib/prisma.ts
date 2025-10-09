// backend/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Simplemente creamos una nueva instancia de PrismaClient.
// Prisma detectará automáticamente las variables de entorno de Vercel
// y gestionará el pool de conexiones por sí mismo.
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}