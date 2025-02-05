import { MAX_PRICE, MIN_PRICE } from '@/lib/store/filters/constants';
import { IProduct } from '../mongoose/models/ItemSchema';

export interface UrlParams {
  skip?: number;
  limit?: number;
  searchTerm?: string;
  brands?: string;
  sizes?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function fetchProducts(
  { skip, limit, searchTerm, brands, sizes, minPrice, maxPrice }: UrlParams,
  signal?: AbortSignal
): Promise<{ products: IProduct[]; hasMore: boolean }> {
  const params = new URLSearchParams();

  if (skip !== undefined) params.append('skip', skip.toString());
  if (limit !== undefined) params.append('limit', limit.toString());
  if (searchTerm) params.append('searchTerm', searchTerm);
  if (brands) params.append('brands', brands);
  if (sizes) params.append('sizes', sizes);
  if (minPrice && minPrice > MIN_PRICE) params.append('minPrice', minPrice.toString());
  if (maxPrice && maxPrice < MAX_PRICE) params.append('maxPrice', maxPrice.toString());

  const url = `/api/products?${params.toString()}`;
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}
