import { ScheduleAppointmentUseCase } from '../ScheduleAppointmentUseCase';
import { IAppointmentRepository } from '../../../domain/repositories/IAppointmentRepository';
import { Appointment } from '../../../domain/entities/Appointment';

describe('ScheduleAppointmentUseCase', () => {
  let mockRepo: jest.Mocked<IAppointmentRepository>;
  let useCase: ScheduleAppointmentUseCase;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
      findByVetId: jest.fn(),
      findByTutorId: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as any;
    useCase = new ScheduleAppointmentUseCase(mockRepo);
  });

  it('should schedule an appointment successfully', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const dto = {
      tutorId: 'tutor-1',
      petId: 'pet-1',
      vetId: 'vet-1',
      serviceId: 'srv-1',
      date: futureDate,
      totalPrice: 150,
      status: 'pending' as const
    };

    const createdAppointment = new Appointment('1', 'tutor-1', 'pet-1', 'vet-1', 'srv-1', futureDate, 'pending', 150, new Date());
    mockRepo.create.mockResolvedValue(createdAppointment);

    const result = await useCase.execute(dto as any);
    expect(mockRepo.create).toHaveBeenCalledWith(expect.objectContaining({ status: 'pending' }));
    expect(result.id).toBe('1');
  });

  it('should throw error if date is in the past', async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const dto = {
      tutorId: 'tutor-1',
      petId: 'pet-1',
      vetId: 'vet-1',
      serviceId: 'srv-1',
      date: pastDate,
      totalPrice: 150,
      status: 'pending' as const
    };

    await expect(useCase.execute(dto as any)).rejects.toThrow('A consulta deve ser agendada para uma data futura.');
  });
});
