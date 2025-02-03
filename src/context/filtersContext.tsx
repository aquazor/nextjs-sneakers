import { createContext, useContext, useState } from 'react';

type Brand = string;
type Size = string;
type FilterKey = 'brands' | 'sizes' | 'all';

export interface IFiltersContext {
  brands: string[];
  sizes: string[];
  onSelectSize: (size: Size) => void;
  onSelectBrand: (brand: Brand) => void;
  clearField: (key: FilterKey) => void;
}

const Context = createContext<IFiltersContext>({
  brands: [],
  sizes: [],
  onSelectSize: () => {},
  onSelectBrand: () => {},
  clearField: () => {},
});

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  const clearField = (key: FilterKey) => {
    switch (key) {
      case 'brands':
        setBrands([]);
        break;
      case 'sizes':
        setSizes([]);
        break;
      case 'all':
        setBrands([]);
        setSizes([]);
        break;
      default:
        return;
    }
  };

  const onSelectSize = (size: Size) => {
    setSizes((prev) => {
      const exists = prev.some((value) => value === size);
      if (exists) {
        return prev.filter((value) => value !== size);
      }
      return [...prev, size];
    });
  };

  const onSelectBrand = (brand: Brand) => {
    setBrands((prev) => {
      const exists = prev.some((value) => value === brand);
      if (exists) {
        return prev.filter((value) => value !== brand);
      }
      return [...prev, brand];
    });
  };

  return (
    <Context value={{ brands, sizes, onSelectSize, onSelectBrand, clearField }}>
      {children}
    </Context>
  );
}

export function useFiltersContext() {
  return useContext(Context);
}
