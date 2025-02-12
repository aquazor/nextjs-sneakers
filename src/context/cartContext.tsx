import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getLocalStorage, setLocalStorage } from '@/lib/utils';
import { ICartItem } from '@/types/cart';
import { cartApi } from '@/lib/api/cart';

export interface CartState {
  count: number;
  cartItems: ICartItem[];
  addCartItem: (item: ICartItem) => Promise<void>;
  removeOrDeleteCartItem: ({
    itemId,
    code,
  }: {
    itemId: ICartItem['itemId'];
    code: ICartItem['code'];
  }) => Promise<void>;
  deleteCartItem: ({
    itemId,
    code,
  }: {
    itemId: ICartItem['itemId'];
    code: ICartItem['code'];
  }) => Promise<void>;
}

const Context = createContext<CartState>({
  count: 0,
  cartItems: [],
  addCartItem: async () => {},
  removeOrDeleteCartItem: async () => {},
  deleteCartItem: async () => {},
});

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [cartItems, setCartItems] = useState<CartState['cartItems']>([]);
  const count = cartItems.length;

  useEffect(() => {
    const fetchItems = async () => {
      if (status === 'authenticated') {
        const items = await cartApi.getItems();
        setCartItems(items);
        setLocalStorage('cart', items);
      } else {
        const cartItems = getLocalStorage<CartState['cartItems']>('cart') || [];
        setCartItems(cartItems);
      }
    };

    fetchItems();
  }, [status]);

  const addCartItem = useCallback(
    async (item: ICartItem) => {
      const cartItems = getLocalStorage<CartState['cartItems']>('cart') || [];
      const itemIndex = cartItems.findIndex(
        (cartItem) =>
          cartItem.itemId === item.itemId && cartItem.size.code === item.size.code
      );

      let newCartItems = cartItems;
      if (itemIndex > -1) {
        newCartItems[itemIndex] = { ...item, count: item.count + 1 };
      } else {
        newCartItems = [...cartItems, item];
      }

      setLocalStorage('cart', newCartItems);

      if (status === 'authenticated') {
        await cartApi.addItem({ item });
      }

      setCartItems(newCartItems);
    },
    [status]
  );

  const removeOrDeleteCartItem = useCallback(
    async ({
      itemId,
      code,
    }: {
      itemId: ICartItem['itemId'];
      code: ICartItem['code'];
    }) => {
      const cartItems = getLocalStorage<CartState['cartItems']>('cart') || [];
      const itemIndex = cartItems.findIndex(
        (cartItem) => cartItem.itemId === itemId && cartItem.size.code === code
      );

      const item = cartItems[itemIndex];
      let newCartItems = cartItems;
      if (itemIndex > -1) {
        if (newCartItems[itemIndex].count > 1) {
          newCartItems[itemIndex] = { ...item, count: item.count - 1 };
        } else {
          newCartItems = newCartItems.filter(
            (cartItem) =>
              !(cartItem.itemId === item.itemId && cartItem.size.code === item.size.code)
          );
        }
      }

      setLocalStorage('cart', newCartItems);

      if (status === 'authenticated') {
        await cartApi.removeOrDeleteItem({
          itemId,
          code,
        });
      }

      setCartItems(newCartItems);
    },
    [status]
  );

  const deleteCartItem = useCallback(
    async ({
      itemId,
      code,
    }: {
      itemId: ICartItem['itemId'];
      code: ICartItem['code'];
    }) => {
      const cartItems = getLocalStorage<CartState['cartItems']>('cart') || [];
      const itemIndex = cartItems.findIndex(
        (cartItem) => cartItem.itemId === itemId && cartItem.size.code === code
      );

      let newCartItems = cartItems;
      if (itemIndex > -1) {
        newCartItems = newCartItems.filter(
          (cartItem) => !(cartItem.itemId === itemId && cartItem.size.code === code)
        );
      }

      setLocalStorage('cart', newCartItems);

      if (status === 'authenticated') {
        await cartApi.deleteItem({
          itemId,
          code,
        });
      }

      setCartItems(newCartItems);
    },
    [status]
  );

  return (
    <Context
      value={{ count, cartItems, addCartItem, removeOrDeleteCartItem, deleteCartItem }}
    >
      {children}
    </Context>
  );
}

export function useCartContext() {
  return useContext(Context);
}
