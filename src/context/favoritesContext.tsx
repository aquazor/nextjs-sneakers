import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { IProduct } from '@/lib/mongoose/models/ItemSchema';
import { getLocalStorage, setLocalStorage } from '@/lib/utils';

export interface FavoritesState {
  count: number;
  favorites: IProduct[];
  addFavorite: (item: IProduct) => void;
  removeFavorite: (item: IProduct) => void;
}

const Context = createContext<FavoritesState>({
  count: 0,
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoritesState['favorites']>([]);
  const count = favorites.length;

  useEffect(() => {
    const favorites = getLocalStorage<IProduct[]>('favorites') || [];
    setFavorites(favorites);
  }, []);

  const addFavorite = useCallback(async (newItem: IProduct) => {
    const favorites = getLocalStorage<IProduct[]>('favorites') || [];
    const newFavorites = [...favorites, newItem];

    setLocalStorage('favorites', newFavorites);

    setFavorites(newFavorites);
  }, []);

  const removeFavorite = useCallback(async (existingItem: IProduct) => {
    const favorites = getLocalStorage<IProduct[]>('favorites') || [];
    const newFavorites = favorites.filter((item) => item._id !== existingItem._id);

    setLocalStorage('favorites', newFavorites);

    setFavorites(newFavorites);
  }, []);

  return (
    <Context value={{ count, favorites, addFavorite, removeFavorite }}>
      {children}
    </Context>
  );
}

export function useFavoritesContext() {
  return useContext(Context);
}
