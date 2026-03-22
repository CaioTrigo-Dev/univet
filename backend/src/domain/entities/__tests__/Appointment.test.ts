import { Appointment } from '../Appointment';

describe('Appointment Domain Entity', () => {
  it('should correctly determine if the appointment is upcoming', () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 2);

    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 2);

    const upcomingApp = new Appointment('1', 'tutor-1', 'pet-1', 'vet-1', 'srv-1', futureDate, 'confirmed', 100, new Date());
    const pastApp = new Appointment('2', 'tutor-1', 'pet-1', 'vet-1', 'srv-1', pastDate, 'completed', 100, new Date());
    const cancelledApp = new Appointment('3', 'tutor-1', 'pet-1', 'vet-1', 'srv-1', futureDate, 'cancelled', 100, new Date());

    expect(upcomingApp.isUpcoming()).toBe(true);
    expect(pastApp.isUpcoming()).toBe(false);
    expect(cancelledApp.isUpcoming()).toBe(false);
  });

  it('should correctly determine if the appointment can be cancelled', () => {
    const pendingApp = new Appointment('1', 'tutor-1', 'p-1', 'v-1', 's-1', new Date(), 'pending', 100, new Date());
    const confirmedApp = new Appointment('2', 'tutor-1', 'p-1', 'v-1', 's-1', new Date(), 'confirmed', 100, new Date());
    const completedApp = new Appointment('3', 'tutor-1', 'p-1', 'v-1', 's-1', new Date(), 'completed', 100, new Date());

    expect(pendingApp.canBeCancelled()).toBe(true);
    expect(confirmedApp.canBeCancelled()).toBe(true);
    expect(completedApp.canBeCancelled()).toBe(false);
  });
});
