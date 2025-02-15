import { ICartItem, ICartItemParams } from '@/types/cart';

async function syncAndGetItems(cartItems: ICartItem[]): Promise<ICartItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems }),
    });

    if (!res.ok) {
      console.log(`Error ${res.status}: ${res.statusText}`);
      return [];
    }

    const { items }: { items: ICartItem[] } = await res.json();
    return items;
  } catch (error) {
    console.log('Failed to sync cart:', error);
    return [];
  }
}

async function addItem({ item }: { item: ICartItem }) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item }),
    });
  } catch (error) {
    console.log(error);
  }
}

async function removeOrDeleteItem({ itemId, code }: ICartItemParams) {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove?itemId=${itemId}&code=${code}`,
      {
        method: 'DELETE',
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function deleteItem({ itemId, code }: ICartItemParams) {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart/delete?itemId=${itemId}&code=${code}`,
      {
        method: 'DELETE',
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export const cartApi = {
  syncAndGetItems,
  addItem,
  removeOrDeleteItem,
  deleteItem,
};
