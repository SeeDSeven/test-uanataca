// src/backend/services/technology.service.test.ts
import { mock, MockProxy } from 'jest-mock-extended';
import { technologyRepository } from '@/backend/repository/technology.repository';
import { technologyService } from './technology.service';
import { Technology } from '@prisma/client';

// Hacemos un mock completo del repositorio. Jest lo interceptará.
jest.mock('@/backend/repository/technology.repository', () => ({
  technologyRepository: mock<typeof technologyRepository>(),
}));

describe('TechnologyService', () => {
  let mockRepository: MockProxy<typeof technologyRepository>;

  beforeEach(() => {
    // Reseteamos el mock antes de cada prueba para que no se interfieran entre sí
    mockRepository = technologyRepository as MockProxy<typeof technologyRepository>;
    mockRepository.findById.mockReset();
  });

  it('debe devolver una tecnología si se encuentra por ID', async () => {
    // 1. Arrange (Organizar)
    const fakeTechnology: Technology = {
      id: 1,
      name: 'React',
      description: 'A JS library',
      category: 'frontend',
      website: 'https://react.dev',
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Configuramos el mock: cuando se llame a findById con el id 1, debe devolver nuestra tecnología falsa
    mockRepository.findById.mockResolvedValue(fakeTechnology);

    // 2. Act (Actuar)
    const result = await technologyService.getById(1);

    // 3. Assert (Afirmar)
    // Verificamos que el servicio devolvió el dato correcto
    expect(result).toEqual(fakeTechnology);
    // Verificamos que el servicio llamó al repositorio con el argumento correcto
    expect(mockRepository.findById).toHaveBeenCalledWith(1);
    // Verificamos que el método fue llamado solo una vez
    expect(mockRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('debe devolver null si la tecnología no se encuentra por ID', async () => {
    // Arrange
    // Configuramos el mock para que no devuelva nada
    mockRepository.findById.mockResolvedValue(null);

    // Act
    const result = await technologyService.getById(99); // Un ID que no existe

    // Assert
    expect(result).toBeNull();
    expect(mockRepository.findById).toHaveBeenCalledWith(99);
  });
});