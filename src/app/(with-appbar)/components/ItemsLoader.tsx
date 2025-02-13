export default function ItemsLoader() {
  return (
    <div className="flex flex-wrap justify-center min-[550px]:justify-start w-full">
      {[...Array(5)].map((_, index) => (
        <div
          className="p-2 w-full max-w-[300px] min-[550px]:max-w-full min-[550px]:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5"
          key={index}
        >
          <div className="shadow-lg border flex flex-col animate-pulse-fast">
            <div className="h-72 border-b bg-primary/10" />
            <div className="space-y-3 px-2 py-4">
              <div className="h-6 border w-3/4" />
              <div className="h-4 border w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
