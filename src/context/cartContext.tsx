import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { IProduct, IProductSize } from '@/lib/mongoose/models/ItemSchema';
import { getLocalStorage, setLocalStorage } from '@/lib/utils';

export interface CartItem extends IProduct {
  count: number;
  size: IProductSize;
}

export interface CartState {
  count: number;
  cartItems: CartItem[];
  addCartItem: (item: CartItem) => void;
  removeCartItem: (code: CartItem['code']) => void;
  incCount: (code: CartItem['code']) => void;
  decCount: (code: CartItem['code']) => void;
}

const Context = createContext<CartState>({
  count: 0,
  cartItems: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incCount: () => {},
  decCount: () => {},
});

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartState['cartItems']>([]);
  const count = cartItems.length;

  useEffect(() => {
    const cartItems = getLocalStorage<CartState['cartItems']>('cart') || [];
    setCartItems(cartItems);
  }, []);

  const addCartItem = useCallback((newItem: CartItem) => {
    const cartItems = getLocalStorage<CartState['cartItems']>('cart') || [];
    const newCrtItems = [...cartItems, newItem];

    setLocalStorage('cart', newCrtItems);
    setCartItems(newCrtItems);
  }, []);

  const removeCartItem = useCallback((code: CartItem['code']) => {
    const cartItems = getLocalStorage<CartState['cartItems']>('cart') || [];
    const newCrtItems = cartItems.filter((item) => item.size.code !== code);

    setLocalStorage('cart', newCrtItems);
    setCartItems(newCrtItems);
  }, []);

  const incCount = useCallback((code: CartItem['code']) => {
    const cartItems = getLocalStorage<CartState['cartItems']>('cart') || [];
    const index = cartItems.findIndex((item) => item.size.code === code);

    if (index === -1) return;

    const item = cartItems[index];
    cartItems[index] = { ...item, count: item.count + 1 };
    const updatedItems = [...cartItems];

    setLocalStorage('cart', updatedItems);
    setCartItems(updatedItems);
  }, []);

  const decCount = useCallback((code: CartItem['code']) => {
    const cartItems = getLocalStorage<CartState['cartItems']>('cart') || [];
    const index = cartItems.findIndex((item) => item.size.code === code);

    if (index === -1) return;

    const item = cartItems[index];
    cartItems[index] = { ...item, count: item.count - 1 };
    const updatedItems = [...cartItems];

    setLocalStorage('cart', updatedItems);
    setCartItems(updatedItems);
  }, []);

  return (
    <Context
      value={{ count, cartItems, addCartItem, removeCartItem, incCount, decCount }}
    >
      {children}
    </Context>
  );
}

export function useCartContext() {
  return useContext(Context);
}
