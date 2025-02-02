import ProductsList from './ProductsList';

export default function Home() {
  return (
    <div className="px-8 py-4">
      <div className="p-5 shadow-lg">123</div>
      <div className="mt-2 lg:pl-2 flex gap-2">
        <div className="p-4 my-2 w-72 shrink-0 hidden lg:block shadow-lg">123</div>
        <ProductsList />
      </div>
    </div>
  );
}
