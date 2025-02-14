import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getLocalStorage, setLocalStorage } from '@/lib/utils';
import { FavoriteSortMethod, IFavoriteItem, IFavoriteItemParams } from '@/types/favorite';
import { favoriteApi } from '@/lib/api/favorite';

interface IFavoriteFilterParams {
  sort: FavoriteSortMethod;
}

export interface FavoriteState {
  count: number;
  favoriteItems: IFavoriteItem[];
  filterParams: IFavoriteFilterParams;
  addFavorite: (item: IFavoriteItem) => Promise<void>;
  deleteFavorite: ({ itemId }: IFavoriteItemParams) => Promise<void>;
  setParamByKey: (key: keyof IFavoriteFilterParams, value: FavoriteSortMethod) => void;
}

const initialParams: IFavoriteFilterParams = { sort: '' };

const Context = createContext<FavoriteState>({
  count: 0,
  favoriteItems: [],
  filterParams: initialParams,
  addFavorite: async () => {},
  deleteFavorite: async () => {},
  setParamByKey: () => {},
});

const sortMethods: Record<
  FavoriteSortMethod,
  (a: IFavoriteItem, b: IFavoriteItem) => number
> = {
  'createdAt:asc': (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  'createdAt:desc': (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  'price:asc': (a, b) => a.price - b.price,
  'price:desc': (a, b) => b.price - a.price,
  'name:asc': (a, b) => a.name.localeCompare(b.name),
  'name:desc': (a, b) => b.name.localeCompare(a.name),
  '': () => 0,
};

export default function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const searchParams = useSearchParams();

  const [filterParams, setFilterParams] = useState<FavoriteState['filterParams']>(() => {
    const sort = (searchParams.get('sort') as FavoriteSortMethod) || '';
    return { sort };
  });
  const [favoriteItems, setFavoriteItems] = useState<FavoriteState['favoriteItems']>([]);
  const count = favoriteItems.length;

  useEffect(() => {
    const fetchItems = async () => {
      const { sort } = filterParams;

      if (status === 'authenticated') {
        const items = await favoriteApi.getItems({ sort });
        setFavoriteItems(items);
        setLocalStorage('favorite', items);
      } else {
        const favorite = getLocalStorage<IFavoriteItem[]>('favorite') || [];
        favorite.sort(sortMethods[sort]);

        setFavoriteItems(favorite);
      }
    };

    fetchItems();
  }, [status, filterParams]);

  const addFavorite = useCallback(
    async (item: IFavoriteItem) => {
      const favorite = getLocalStorage<IFavoriteItem[]>('favorite') || [];
      const exists = favorite.some((favItem) => favItem.itemId === item.itemId);
      if (exists) {
        return;
      }

      const newFavorite = [...favorite, item];
      setLocalStorage('favorite', newFavorite);

      if (status === 'authenticated') {
        await favoriteApi.addItem({ item });
      }

      setFavoriteItems(newFavorite);
    },
    [status]
  );

  const deleteFavorite = useCallback(
    async ({ itemId }: IFavoriteItemParams) => {
      const favorite = getLocalStorage<IFavoriteItem[]>('favorite') || [];
      const newFavorite = favorite.filter((item) => item.itemId !== itemId);

      setLocalStorage('favorite', newFavorite);

      if (status === 'authenticated') {
        await favoriteApi.deleteItem({ itemId });
      }

      setFavoriteItems(newFavorite);
    },
    [status]
  );

  const setParamByKey = useCallback(
    (key: keyof IFavoriteFilterParams, value: FavoriteSortMethod) => {
      setFilterParams((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <Context
      value={{
        count,
        favoriteItems,
        addFavorite,
        deleteFavorite,
        filterParams,
        setParamByKey,
      }}
    >
      {children}
    </Context>
  );
}

export function useFavoriteContext() {
  return useContext(Context);
}
