import { createContext, useCallback, useContext, useState } from 'react';
import { IProduct } from '@/lib/mongoose/models/ItemSchema';
import { fetchProducts, UrlParams } from '@/lib/api/products';

export interface IProductsContext {
  products: IProduct[];
  moreAvailable: boolean;
  isLoading: boolean;
  loadMore: (params: UrlParams) => Promise<void>;
  getProducts: (params: UrlParams, signal?: AbortSignal) => Promise<void>;
}

const Context = createContext<IProductsContext>({
  products: [],
  moreAvailable: true,
  isLoading: true,
  loadMore: async () => {},
  getProducts: async () => {},
});

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [skip, setSkip] = useState(0);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const limit = 8;

  //   useEffect(() => {
  //     const loadInitialData = async () => {
  //       try {
  //         const { products: data, hasMore } = await fetchProducts({ skip: 0, limit });
  //         setProducts(data);
  //         setMoreAvailable(hasMore);
  //         setSkip(hasMore ? data.length : 0);
  //       } catch (error) {
  //         console.log(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     loadInitialData();
  //   }, []);

  const loadMore = useCallback(
    async (params: UrlParams) => {
      try {
        setIsLoading(true);

        const { products, hasMore } = await fetchProducts({ ...params, skip, limit });

        setProducts((prev) => [...prev, ...products]);
        setSkip((prev) => prev + limit);
        setMoreAvailable(hasMore);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [skip]
  );

  const getProducts = useCallback(
    async (params: UrlParams, signal?: AbortSignal): Promise<void> => {
      try {
        setIsLoading(true);
        setSkip(0);

        const { products: data, hasMore } = await fetchProducts(
          {
            ...params,
            skip: 0,
            limit,
          },
          signal
        );

        setProducts(data);
        setSkip(hasMore ? data.length : 0);
        setMoreAvailable(hasMore);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Fetch aborted');
          return;
        }
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <Context
      value={{
        products,
        moreAvailable,
        loadMore,
        isLoading,
        getProducts,
      }}
    >
      {children}
    </Context>
  );
}

export function useProductsContext() {
  return useContext(Context);
}
