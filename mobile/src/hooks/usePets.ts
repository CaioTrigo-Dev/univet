import { useState, useCallback } from 'react';
import { Pet } from '@univet/shared';
import { petsService } from '../services/pets.service';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook usePets
 * Abstrai a lógica de gestão de pets para os componentes.
 */
export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Assume-se que o token está disponível no contexto

  const fetchPets = useCallback(async (token: string) => {
    setLoading(true);
    try {
      const data = await petsService.listMine(token);
      setPets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    pets,
    loading,
    fetchPets,
  };
}
