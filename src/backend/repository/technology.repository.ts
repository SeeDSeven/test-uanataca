// backend/repository/technology.repository.ts
import { prisma } from "@/backend/lib/prisma";
import { Prisma } from "@prisma/client";

export const technologyRepository = {
  findAll: () => {
    return prisma.technology.findMany({
      orderBy: { created_at: 'desc' }
    });
  },

  findById: (id: number) => {
    return prisma.technology.findUnique({
      where: { id },
    });
  },

  create: (data: Prisma.TechnologyCreateInput) => {
    return prisma.technology.create({ data });
  },

  update: (id: number, data: Prisma.TechnologyUpdateInput) => {
    return prisma.technology.update({
      where: { id },
      data,
    });
  },

  delete: (id: number) => {
    return prisma.technology.delete({
      where: { id },
    });
  },
};