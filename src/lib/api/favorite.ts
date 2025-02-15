import { FavoriteSortMethod, IFavoriteItem, IFavoriteItemParams } from '@/types/favorite';

async function getItems({
  sort,
}: {
  sort: FavoriteSortMethod;
}): Promise<IFavoriteItem[]> {
  const params = new URLSearchParams();
  if (sort) params.append('sort', sort);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/favorite?${params.toString()}`
    );
    const { items }: { items: IFavoriteItem[] } = await res.json();
    return items;
  } catch (error) {
    console.log(error);
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
  getItems,
  addItem,
  deleteItem,
};
