import { FaCaretDown } from 'react-icons/fa';
import { FavoriteSortMethod } from '@/types/favorite';
import { cn } from '@/lib/utils';

interface Props {
  value: FavoriteSortMethod;
  id: string;
  name: string;
  className?: string;
  options: { name: string; value: string }[];
  onChange: (value: string) => void;
}

export default function Select({ id, name, value, options, className, onChange }: Props) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value as FavoriteSortMethod)}
        className={cn(
          'block w-full pl-2 pr-7 py-0.5 border appearance-none bg-background cursor-pointer',
          className
        )}
      >
        {options.map(({ name, value }) => (
          <option key={name} value={value}>
            {name}
          </option>
        ))}
      </select>

      <FaCaretDown
        size={16}
        className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
}
