import {useCallback, useState} from 'react';
import {addonsApi, Addon} from '../services/api';

export const useItemAddonsDisplay = () => {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadForItem = useCallback(async (itemId: number) => {
    try {
      setIsLoading(true);
      const data = await addonsApi.listForItem(itemId);
      setAddons(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load addons.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setAddons([]);
  }, []);

  return {
    addons,
    isLoading,
    error,
    loadForItem,
    clear,
  };
};

