import { GoSearch } from 'react-icons/go';

export default function SearchPanel() {
  return (
    <div className="flex items-center gap-2">
      <GoSearch size={24} className="shrink-0" />
      <input
        id="searchProducts"
        name="searchProducts"
        type="text"
        placeholder="Search"
        className="px-2 py-1 border border-border w-full placeholder:text-sm bg-background"
      />
    </div>
  );
}
