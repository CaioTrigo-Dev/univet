import React, { createContext, useState, useContext } from 'react';
import { Pet, Appointment } from '@univet/shared';

interface BookingData {
  pet?: Pet;
  serviceId?: string;
  serviceName?: string;
  vetId?: string;
  vetName?: string;
  scheduledAt?: Date;
  totalPrice?: number;
}

interface BookingContextData {
  booking: BookingData;
  setPet: (pet: Pet) => void;
  setService: (serviceId: string, price: number, serviceName: string) => void;
  setVetAndTime: (vetId: string, date: Date, vetName: string) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextData>({} as BookingContextData);

/**
 * BookingProvider
 * Gerencia o estado do agendamento multi-etapa (Wizards).
 */
export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [booking, setBooking] = useState<BookingData>({});

  const setPet = (pet: Pet) => setBooking(prev => ({ ...prev, pet }));
  
  const setService = (serviceId: string, price: number, serviceName: string) =>
    setBooking(prev => ({ ...prev, serviceId, totalPrice: price, serviceName }));

  const setVetAndTime = (vetId: string, date: Date, vetName: string) =>
    setBooking(prev => ({ ...prev, vetId, scheduledAt: date, vetName }));

  const resetBooking = () => setBooking({});

  return (
    <BookingContext.Provider value={{ booking, setPet, setService, setVetAndTime, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
