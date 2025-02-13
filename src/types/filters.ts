export type ISortMethod = 'price:asc' | 'price:desc' | 'name:asc' | 'name:desc' | '';

export interface IFilterParams {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  brands: string;
  sizes: string;
  sort: ISortMethod;
}

export interface UrlFilterParams extends Partial<IFilterParams> {
  skip?: string;
  limit?: string;
}
