import { RegisterPetUseCase } from '../RegisterPetUseCase';
import { IPetRepository } from '../../../domain/repositories/IPetRepository';
import { Pet } from '../../../domain/entities/Pet';
import { Pet as IPet } from '@univet/shared';

describe('RegisterPetUseCase', () => {
  let mockRepo: jest.Mocked<IPetRepository>;
  let useCase: RegisterPetUseCase;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      findByTutorId: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as any;
    useCase = new RegisterPetUseCase(mockRepo);
  });

  it('should successfully register a pet', async () => {
    const dto = {
      name: 'Fluffy',
      species: 'cat' as const,
      breed: 'Persian',
      birthDate: new Date('2020-01-01'),
      tutorId: 'tutor-1',
      createdAt: new Date()
    };

    const createdPet = new Pet('1', 'Fluffy', 'cat', 'Persian', dto.birthDate, 'tutor-1', dto.createdAt);
    mockRepo.create.mockResolvedValue(createdPet);

    const result = await useCase.execute(dto as any);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(result.name).toBe('Fluffy');
  });

  it('should throw error if name is missing', async () => {
    const dto = {
      name: '',
      species: 'cat' as const,
      breed: 'Persian',
      birthDate: new Date('2020-01-01'),
      tutorId: 'tutor-1',
      createdAt: new Date()
    };

    await expect(useCase.execute(dto as any)).rejects.toThrow('Nome do pet é obrigatório.');
  });

  it('should throw error if birthDate is in the future', async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    const dto = {
      name: 'Future Pet',
      species: 'dog' as const,
      breed: 'Pug',
      birthDate: futureDate,
      tutorId: 'tutor-1',
      createdAt: new Date()
    };

    await expect(useCase.execute(dto as any)).rejects.toThrow('Data de nascimento inválida.');
  });
});
