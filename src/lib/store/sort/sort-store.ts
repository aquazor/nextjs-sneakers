import { create } from 'zustand';
import { SortMethod } from './types';

interface SortState {
  sortBy: SortMethod;
  setSort: (method: SortMethod) => void;
}

export const useSortStore = create<SortState>()((set) => ({
  sortBy: 'none',
  setSort: (method) => {
    set(() => ({
      sortBy: method,
    }));
  },
}));
