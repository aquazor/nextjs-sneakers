import MultiRangeSlider from '@/components/MultirangeSlider/MultirangeSlider';
import { MdOutlinePriceChange } from 'react-icons/md';

export default function PricePanel() {
  return (
    <div className="group flex items-center gap-2 mb-2">
      <MdOutlinePriceChange size={24} className="shrink-0" />

      <MultiRangeSlider min={0} max={5000} />
    </div>
  );
}
