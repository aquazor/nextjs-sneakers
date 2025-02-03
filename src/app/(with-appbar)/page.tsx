import Filters from './Filters';
import ProductsList from './ProductsList';

export default function Home() {
  return (
    <div className="p-4 max-w-[1800px] mx-auto">
      <div className="flex lg:gap-2">
        <Filters />
        <ProductsList />
      </div>
    </div>
  );
}
