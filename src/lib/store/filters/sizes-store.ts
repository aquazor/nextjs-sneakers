import { create } from 'zustand';
import { Size } from './types';

interface SizeState {
  sizes: Size[];
  selectSize: (size: Size) => void;
  clearSizes: () => void;
}

export const useSizeStore = create<SizeState>()((set) => ({
  sizes: [],
  selectSize(size) {
    set(({ sizes }) => ({
      sizes: sizes.includes(size)
        ? sizes.filter((value) => value !== size)
        : [...sizes, size],
    }));
  },
  clearSizes() {
    set(() => ({ sizes: [] }));
  },
}));
