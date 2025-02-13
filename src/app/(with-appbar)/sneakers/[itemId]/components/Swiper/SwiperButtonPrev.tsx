import { useSwiper } from 'swiper/react';
import { BsChevronLeft } from 'react-icons/bs';

export function SwiperButtonPrev() {
  const swiper = useSwiper();

  return (
    <div
      onClick={() => swiper.slidePrev()}
      className="m-1 group cursor-pointer absolute h-[400px] lg:h-[500px] xl:h-[580px] z-[2] w-1/5 flex items-center left-0 top-0"
    >
      <div className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/15 to-transparent" />
      <button className="transition opacity-50 group-hover:opacity-60 group-hover:scale-110">
        <BsChevronLeft className="size-[30px] sm:size-[40px]" />
      </button>
    </div>
  );
}
