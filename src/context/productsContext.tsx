import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { IProduct } from '@/lib/mongoose/models/ItemSchema';

export interface IProductsContext {
  products: IProduct[];
  moreAvailable: boolean;
  isLoading: boolean;
  loadMore: () => Promise<void>;
}

const Context = createContext<IProductsContext>({
  products: [],
  moreAvailable: true,
  isLoading: true,
  loadMore: async () => {},
});

const fetchProducts = async (skip: number, limit: number) => {
  const res = await fetch(`/api/products?skip=${skip}&limit=${limit}`);
  return res.json();
};

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [skip, setSkip] = useState(0);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const limit = 6;

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await fetchProducts(0, 8);
        setProducts(data.products);
        setMoreAvailable(data.hasMore);
        setSkip(data.products.length);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const loadMore = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await fetchProducts(skip, limit);

      setProducts((prev) => [...prev, ...data.products]);
      setSkip(skip + limit);
      setMoreAvailable(data.hasMore);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [skip]);

  return (
    <Context value={{ products, moreAvailable, loadMore, isLoading }}>{children}</Context>
  );
}

export function useProductsContext() {
  return useContext(Context);
}
