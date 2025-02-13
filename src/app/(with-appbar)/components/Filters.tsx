'use client';

import { useEffect, useState } from 'react';
import { RiFilter2Line, RiFilter2Fill } from 'react-icons/ri';
import { IoCloseCircleOutline } from 'react-icons/io5';
import useIsBreakpoint from '@/hooks/useIsBreakpoint';
import SearchPanel from './SearchPanel';
import SortPanel from './SortPanel';
import PricePanel from './PricePanel';
import BrandsPanel from './BrandsPanel';
import SizesPanel from './SizesPanel';
import ButtonsPanel from './ButtonsPanel';

export default function Filters() {
  const [isOpen, setIsOpen] = useState(false);
  const isTablet = useIsBreakpoint(1024);

  useEffect(() => {
    if (isTablet) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTablet]);

  return (
    <div className="shrink-0 sticky top-4 max-h-fit z-[2] lg:mt-2 lg:ml-2">
      <div className="absolute lg:static top-0 left-0 shadow-xl bg-background/20 border backdrop-blur-md">
        <button
          className="flex lg:hidden w-full justify-between items-center gap-1 p-1"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <>
              <RiFilter2Fill className="text-3xl shrink-0" />
              <IoCloseCircleOutline className="text-3xl shrink-0" />
            </>
          ) : (
            <>
              <RiFilter2Line className="text-3xl shrink-0" />
              <span className="block lg:hidden text font-bold text-nowrap border border-primary px-1 py-0.5">
                Show Filters
              </span>
            </>
          )}
        </button>

        {isOpen && (
          <div className="bg-background min-w-52 max-w-72">
            <div className="p-2 flex flex-col gap-3">
              <SearchPanel />
              <SortPanel />
              <PricePanel />
              <BrandsPanel />
              <SizesPanel />
              <ButtonsPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
