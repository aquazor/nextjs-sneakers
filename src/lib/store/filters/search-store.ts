import { create } from 'zustand';
import { SearchTerm } from './types';

interface SearchTermState {
  term: SearchTerm;
  setTerm: (term: SearchTerm) => void;
  clearTerm: () => void;
}

export const useSearchStore = create<SearchTermState>()((set) => ({
  term: '',
  setTerm(term) {
    set(() => ({
      term,
    }));
  },
  clearTerm() {
    set(() => ({ term: '' }));
  },
}));
