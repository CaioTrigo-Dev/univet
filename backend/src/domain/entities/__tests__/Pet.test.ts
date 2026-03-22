import { Pet } from '../Pet';

describe('Pet Domain Entity', () => {
  it('should calculate age correctly in years', () => {
    // Definir data de nascimento como exatos 3 anos atrás
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 3);

    const pet = new Pet(
      'pet-1',
      'Rex',
      'dog',
      'Golden',
      birthDate,
      'tutor-1',
      new Date()
    );

    expect(pet.ageInYears).toBe(3);
  });

  it('should correctly determine if the pet is adult', () => {
    const adultBirthDate = new Date();
    adultBirthDate.setFullYear(adultBirthDate.getFullYear() - 2);

    const puppyBirthDate = new Date();
    puppyBirthDate.setMonth(puppyBirthDate.getMonth() - 6);

    const adultPet = new Pet('pet-1', 'Adult', 'dog', 'Mix', adultBirthDate, 'tutor-1', new Date());
    const puppyPet = new Pet('pet-2', 'Puppy', 'dog', 'Mix', puppyBirthDate, 'tutor-1', new Date());

    expect(adultPet.isAdult()).toBe(true);
    expect(puppyPet.isAdult()).toBe(false);
  });
});
