import { create } from 'zustand';
import { Brand } from './types';

interface BrandState {
  brands: Brand[];
  selectBrand: (brand: Brand) => void;
  clearBrands: () => void;
}

export const useBrandStore = create<BrandState>()((set) => ({
  brands: [],
  selectBrand(brand) {
    set(({ brands }) => ({
      brands: brands.includes(brand)
        ? brands.filter((b) => b !== brand)
        : [...brands, brand],
    }));
  },
  clearBrands() {
    set(() => ({ brands: [] }));
  },
}));
