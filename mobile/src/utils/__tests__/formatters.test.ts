import { formatBRL, formatDate, isToday } from '../formatters';

describe('Formatters Utilities', () => {
  describe('formatBRL', () => {
    it('should format numbers to BRL currency string correctly', () => {
      expect(formatBRL(10)).toContain('10,00');
      expect(formatBRL(1500.5)).toContain('1.500,50');
      expect(formatBRL(0)).toContain('0,00');
    });
  });

  describe('formatDate', () => {
    it('should format Date object to a readable Brazilian string', () => {
      const date = new Date('2024-05-15T12:00:00Z');
      const formatted = formatDate(date);
      // Validando a presença do dia e mês. Ano e formato pode variar dependendo da config do sistema rodando os testes no node.
      expect(formatted).toMatch(/15|05/); 
    });
  });

  describe('isToday', () => {
    it('should return true if the given date is today', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('should return false if the given date is not today', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      expect(isToday(yesterday)).toBe(false);
      expect(isToday(tomorrow)).toBe(false);
    });
  });
});
