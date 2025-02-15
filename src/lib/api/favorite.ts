import { FavoriteSortMethod, IFavoriteItem, IFavoriteItemParams } from '@/types/favorite';

async function syncAndGetItems(
  favItems: IFavoriteItem[],
  {
    sort,
  }: {
    sort: FavoriteSortMethod;
  }
): Promise<IFavoriteItem[]> {
  try {
    const params = new URLSearchParams();
    if (sort) params.append('sort', sort);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/favorite?${params.toString()}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: favItems }),
      }
    );

    if (!res.ok) {
      console.log(`Error ${res.status}: ${res.statusText}`);
      return [];
    }

    const { items }: { items: IFavoriteItem[] } = await res.json();
    return items;
  } catch (error) {
    console.log('Failed to sync favorite:', error);
    return [];
  }
}

async function addItem({ item }: { item: IFavoriteItem }) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorite/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item }),
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteItem({ itemId }: IFavoriteItemParams) {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/favorite/delete?itemId=${itemId}`,
      {
        method: 'DELETE',
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export const favoriteApi = {
  syncAndGetItems,
  addItem,
  deleteItem,
};
