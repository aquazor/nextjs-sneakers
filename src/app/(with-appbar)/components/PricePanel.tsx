import { MdOutlinePriceChange } from 'react-icons/md';
import { MAX_PRICE, MIN_PRICE, STEP } from '@/lib/store/filters/constants';
import MultiRangeSlider from '@/components/MultirangeSlider/MultirangeSlider';

export default function PricePanel() {
  return (
    <div className="group flex items-center gap-2">
      <MdOutlinePriceChange size={24} className="shrink-0" />

      <div className="mb-2">
        <MultiRangeSlider min={MIN_PRICE} max={MAX_PRICE} step={STEP} />
      </div>
    </div>
  );
}
