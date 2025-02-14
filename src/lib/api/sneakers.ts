import { MAX_PRICE, MIN_PRICE } from '@/constants';
import { UrlFilterParams } from '@/types/filters';
import { IProduct } from '@/types/product';

export async function fetchItems(
  { skip, limit, searchTerm, brands, sizes, minPrice, maxPrice, sort }: UrlFilterParams,
  signal?: AbortSignal
): Promise<{ items: IProduct[]; hasMore: boolean }> {
  try {
    const params = new URLSearchParams();
    if (skip !== undefined) params.append('skip', skip);
    if (limit !== undefined) params.append('limit', limit);
    if (searchTerm) params.append('searchTerm', searchTerm);
    if (brands) params.append('brands', brands);
    if (sizes) params.append('sizes', sizes);
    if (minPrice !== undefined && Number(minPrice) > MIN_PRICE)
      params.append('minPrice', minPrice);
    if (maxPrice !== undefined && Number(maxPrice) < MAX_PRICE)
      params.append('maxPrice', maxPrice);
    if (sort) params.append('sort', sort);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/sneakers?${params.toString()}`;
    const res = await fetch(url, { signal });

    if (!res.ok) {
      return { items: [], hasMore: false };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { items: [], hasMore: false };
  }
}

export async function fetchItemById({
  itemId,
}: {
  itemId: string;
}): Promise<{ item: IProduct }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sneakers/${itemId}`);
    const item = await res.json();
    return item;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch item ${itemId}`);
  }
}
