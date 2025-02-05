import { create } from 'zustand';
import { SearchTerm } from './types';

interface SearchTermState {
  searchTerm: SearchTerm;
  setSearchTerm: (searchTerm: SearchTerm) => void;
  clearTerm: () => void;
}

export const useSearchStore = create<SearchTermState>()((set) => ({
  searchTerm: '',
  setSearchTerm(searchTerm) {
    set(() => ({
      searchTerm,
    }));
  },
  clearTerm() {
    set(() => ({ searchTerm: '' }));
  },
}));
