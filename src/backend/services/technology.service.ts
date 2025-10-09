// backend/services/technology.service.ts
import { technologyRepository } from "@/backend/repository/technology.repository";
import { Prisma } from "@prisma/client";

export const technologyService = {
  getAll: () => {
    return technologyRepository.findAll();
  },

  getById: (id: number) => {
    return technologyRepository.findById(id);
  },

  create: (data: Prisma.TechnologyCreateInput) => {
    return technologyRepository.create(data);
  },

  update: (id: number, data: Prisma.TechnologyUpdateInput) => {
    return technologyRepository.update(id, data);
  },

  delete: (id: number) => {
    return technologyRepository.delete(id);
  },
};