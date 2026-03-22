import { ScheduleAppointmentUseCase } from '../../src/application/usecases/ScheduleAppointmentUseCase';
import { IAppointmentRepository } from '../../src/domain/repositories/IAppointmentRepository';

/**
 * Teste Unitário: ScheduleAppointmentUseCase
 * Demonstra a facilidade de testar regras de negócio com Clean Architecture.
 */
describe('ScheduleAppointmentUseCase', () => {
  let useCase: ScheduleAppointmentUseCase;
  let mockRepo: jest.Mocked<IAppointmentRepository>;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByTutor: jest.fn(),
      findByVet: jest.fn(),
      update: jest.fn(),
    } as any;

    useCase = new ScheduleAppointmentUseCase(mockRepo);
  });

  it('deve agendar uma consulta com sucesso para uma data futura', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const dto = {
      petId: 'pet-1',
      serviceId: 'service-1',
      vetId: 'vet-1',
      tutorId: 'tutor-1',
      scheduledAt: futureDate,
      totalPrice: 100,
      status: 'pending' as any
    };

    mockRepo.create.mockResolvedValue({ id: 'appt-1', ...dto, createdAt: new Date() } as any);

    const result = await useCase.execute(dto);

    expect(result.id).toBe('appt-1');
    expect(mockRepo.create).toHaveBeenCalled();
  });

  it('deve lançar erro ao agendar para uma data passada', async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const dto = {
      petId: 'pet-1',
      serviceId: 'service-1',
      vetId: 'vet-1',
      tutorId: 'tutor-1',
      scheduledAt: pastDate,
      totalPrice: 100,
      status: 'pending' as any
    };

    await expect(useCase.execute(dto)).rejects.toThrow('A consulta deve ser agendada para uma data futura.');
  });
});
