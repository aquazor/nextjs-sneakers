import { ICartItem, ICartItemParams } from '@/types/cart';

async function getItems(): Promise<ICartItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`);
    const { items }: { items: ICartItem[] } = await res.json();
    return items;
  } catch (error) {
    console.log(error);
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
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemId,
        code,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteItem({ itemId, code }: ICartItemParams) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemId,
        code,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

export const cartApi = {
  getItems,
  addItem,
  removeOrDeleteItem,
  deleteItem,
};
