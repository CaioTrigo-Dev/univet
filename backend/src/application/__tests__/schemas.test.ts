import { RegisterUserSchema, CreatePetSchema, ScheduleAppointmentSchema } from '@univet/shared';

describe('Shared Zod Validation Schemas', () => {
  describe('RegisterUserSchema', () => {
    it('should validate a correct user payload', () => {
      const payload = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      expect(() => RegisterUserSchema.parse(payload)).not.toThrow();
    });

    it('should throw if email is invalid', () => {
      const payload = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User',
      };
      expect(() => RegisterUserSchema.parse(payload)).toThrow('E-mail inválido');
    });

    it('should throw if password is too short', () => {
      const payload = {
        email: 'test@example.com',
        password: '123',
        name: 'Test User',
      };
      expect(() => RegisterUserSchema.parse(payload)).toThrow('A senha deve ter pelo menos 6 caracteres');
    });
  });

  describe('CreatePetSchema', () => {
    it('should validate a correct pet payload', () => {
      const payload = {
        name: 'Rex',
        species: 'dog',
        breed: 'Golden Retriever',
        birthDate: '2020-01-01',
      };
      expect(() => CreatePetSchema.parse(payload)).not.toThrow();
    });

    it('should throw if species is invalid', () => {
      const payload = {
        name: 'Rex',
        species: 'dragon',
        breed: 'Golden Retriever',
        birthDate: '2020-01-01',
      };
      expect(() => CreatePetSchema.parse(payload)).toThrow();
    });
  });

  describe('ScheduleAppointmentSchema', () => {
    it('should validate a correct appointment payload', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const payload = {
        petId: 'pet-1',
        vetId: 'vet-1',
        serviceId: 'srv-1',
        date: futureDate.toISOString(),
        totalPrice: 150.0,
      };
      expect(() => ScheduleAppointmentSchema.parse(payload)).not.toThrow();
    });

    it('should throw if date is in the past', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const payload = {
        petId: 'pet-1',
        vetId: 'vet-1',
        serviceId: 'srv-1',
        date: pastDate.toISOString(),
        totalPrice: 150.0,
      };
      expect(() => ScheduleAppointmentSchema.parse(payload)).toThrow('A data deve ser futura');
    });
  });
});
