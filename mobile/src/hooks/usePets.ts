import { useState, useCallback, useEffect } from 'react';
import { Pet } from '@univet/shared';
import { petsService } from '../services/pets.service';
import { auth } from '../firebase/config';

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = useCallback(async () => {
    const token = await auth.currentUser?.getIdToken();
    if (!token) { setLoading(false); return; }
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

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return { pets, loading, fetchPets };
}
