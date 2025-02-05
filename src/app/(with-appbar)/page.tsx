import Filters from './components/Filters';
import ProductsList from './components/ProductsList';

export default function Home() {
  return (
    <div className="p-4 max-w-[112.5rem] mx-auto">
      <div className="flex lg:gap-2">
        <Filters />
        <ProductsList />
      </div>
    </div>
  );
}
