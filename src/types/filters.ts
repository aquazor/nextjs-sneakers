export type ISortMethod = 'price:asc' | 'price:desc' | 'name:asc' | 'nameDesc' | '';

export interface IFilterParamsState {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  brands: string;
  sizes: string;
  sort: ISortMethod;
}

export interface UrlFilterParams extends Partial<IFilterParamsState> {
  skip?: string;
  limit?: string;
}
