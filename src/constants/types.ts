export type SortMethod = 'price:asc' | 'price:desc' | 'name:asc' | 'nameDesc' | '';

export interface FilterParamsState {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  brands: string;
  sizes: string;
  sort: SortMethod;
}

export interface UrlFilterParams extends Partial<FilterParamsState> {
  skip?: string;
  limit?: string;
}
