import { GoSearch } from 'react-icons/go';
import { useSearchStore } from '@/lib/store/filters/search-store';
import { IoCloseCircleOutline } from 'react-icons/io5';

export default function SearchPanel() {
  const { term, setTerm } = useSearchStore();

  return (
    <div className="flex items-center gap-2">
      <GoSearch size={24} className="shrink-0" />
      <div className="flex w-full relative">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          autoComplete="off"
          id="searchTerm"
          name="searchTerm"
          type="text"
          placeholder="Search"
          className="pl-2 py-1 pr-7 border border-border w-full placeholder:text-sm bg-background"
        />

        {term.length > 0 && (
          <button
            onClick={() => setTerm('')}
            className="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center"
          >
            <IoCloseCircleOutline size={20} className="text-red-300" />
          </button>
        )}
      </div>
    </div>
  );
}
