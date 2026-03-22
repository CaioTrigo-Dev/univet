import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { BookingProvider, useBooking } from '../src/contexts/BookingContext';

// Mock do Pet
const mockPet = { id: '1', name: 'Pipoca', species: 'dog', breed: 'SRD', birthDate: new Date() };

describe('BookingContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BookingProvider>{children}</BookingProvider>
  );

  it('deve inicializar com estado vazio', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });
    expect(result.current.pet).toBeNull();
    expect(result.current.step).toBe(1);
  });

  it('deve permitir selecionar um pet e avançar o passo', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.setPet(mockPet as any);
      result.current.nextStep();
    });

    expect(result.current.pet).toEqual(mockPet);
    expect(result.current.step).toBe(2);
  });
});
