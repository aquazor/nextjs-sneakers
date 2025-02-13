import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getLocalStorage, setLocalStorage } from '@/lib/utils';
import { ICartItem, ICartItemParams } from '@/types/cart';
import { cartApi } from '@/lib/api/cart';

export interface CartState {
  count: number;
  cartItems: ICartItem[];
  isLoading: boolean;
  addCartItem: (item: ICartItem) => Promise<void>;
  removeOrDeleteCartItem: ({ itemId, code }: ICartItemParams) => Promise<void>;
  deleteCartItem: ({ itemId, code }: ICartItemParams) => Promise<void>;
}

const Context = createContext<CartState>({
  count: 0,
  cartItems: [],
  isLoading: true,
  addCartItem: async () => {},
  removeOrDeleteCartItem: async () => {},
  deleteCartItem: async () => {},
});

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartState['cartItems']>([]);
  const count = cartItems.reduce((acc, item) => acc + item.count, 0);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      if (status === 'authenticated') {
        const items = await cartApi.getItems();
        setCartItems(items);
        setLocalStorage('cart', items);
      } else {
        const cartItems = getLocalStorage<CartState['cartItems']>('cart') || [];
        setCartItems(cartItems);
      }
      setIsLoading(false);
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
    async ({ itemId, code }: ICartItemParams) => {
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
            (cartItem) => !(cartItem.itemId === itemId && cartItem.size.code === code)
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
    async ({ itemId, code }: ICartItemParams) => {
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
      value={{
        count,
        cartItems,
        isLoading,
        addCartItem,
        removeOrDeleteCartItem,
        deleteCartItem,
      }}
    >
      {children}
    </Context>
  );
}

export function useCartContext() {
  return useContext(Context);
}
