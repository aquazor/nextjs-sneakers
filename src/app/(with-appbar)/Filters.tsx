'use client';

import { useEffect, useState } from 'react';
import { RiFilter2Line } from 'react-icons/ri';
import { RiFilter2Fill } from 'react-icons/ri';
import { IoCloseCircleOutline } from 'react-icons/io5';
import BrandsPanel from './BrandsPanel';
import SizesPanel from './SizesPanel';
import PricePanel from './PricePanel';
import SearchPanel from './SearchPanel';
import ButtonsPanel from './ButtonsPanel';
import useIsMobile from '../hooks/useIsMobile';

export default function Filters() {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="shrink-0 sticky top-4 max-h-fit z-50 lg:mt-2">
      <div className="absolute lg:static top-0 left-0 drop-shadow-xl bg-primary/10 backdrop-blur-md">
        <button
          className="flex w-full justify-between items-center p-1"
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
              <span className="block lg:hidden text font-bold text-nowrap border border-primary p-1">
                Show Filters
              </span>
            </>
          )}
        </button>

        {isOpen && (
          <div className="bg-background w-72">
            <div className="px-2 py-2 flex flex-col gap-3">
              <SearchPanel />
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
