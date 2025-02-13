import { useSwiper } from 'swiper/react';
import { BsChevronRight } from 'react-icons/bs';

export function SwiperButtonNext() {
  const swiper = useSwiper();

  return (
    <div
      onClick={() => swiper.slideNext()}
      className="m-1 group cursor-pointer absolute h-[400px] lg:h-[500px] xl:h-[580px] z-[2] w-1/5 flex items-center justify-end right-0 top-0"
    >
      <div className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-l from-primary/15 to-transparent" />
      <button className="transition duration-300 opacity-50 group-hover:opacity-60 group-hover:scale-110">
        <BsChevronRight className="size-[30px] sm:size-[40px]" />
      </button>
    </div>
  );
}
