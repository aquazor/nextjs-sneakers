export default function ItemsLoading() {
  return (
    <div className="p-4 max-w-[112.5rem] mx-auto">
      <div className="flex lg:gap-2">
        <div className="absolute lg:static z-50 lg:mt-2 lg:ml-2 bg-background shadow-xl w-72 shrink-0 h-fit">
          <div className="block lg:hidden w-full h-8 bg-primary/10 animate-pulse-fast" />

          <div className="p-2 flex flex-col gap-3 animate-pulse-fast">
            <div className="w-full flex items-center gap-2">
              <div className="size-5 shrink-0 border bg-primary/10" />
              <div className="h-6 w-full border bg-primary/10" />
            </div>

            <div className="w-full flex items-center gap-2">
              <div className="size-5 shrink-0 border bg-primary/10" />
              <div className="h-6 w-full border bg-primary/10" />
            </div>

            <div className="w-full flex items-center gap-2">
              <div className="size-5 shrink-0 border bg-primary/10" />
              <div className="h-6 w-full border bg-primary/10" />
            </div>

            <div className="w-full">
              <div className="shrink-0 flex gap-2">
                <div className="size-5 shrink-0 border bg-primary/10" />
                <div className="h-6 w-full border bg-primary/10" />
              </div>

              <div className="mt-4 ml-8 space-y-1">
                <div className="h-6 bg-primary/10 border" />
                <div className="h-6 bg-primary/10 border" />
                <div className="h-6 bg-primary/10 border" />
                <div className="h-6 bg-primary/10 border" />
                <div className="h-6 bg-primary/10 border" />
              </div>
            </div>

            <div className="w-full">
              <div className="shrink-0 flex gap-2">
                <div className="size-5 shrink-0 border bg-primary/10" />
                <div className="h-6 w-full border bg-primary/10" />
              </div>

              <div className="mt-4 ml-8 grid grid-cols-2 gap-2">
                <div className="h-6 bg-primary/10 border" />
                <div className="h-6 bg-primary/10 border" />
                <div className="h-6 bg-primary/10 border" />
                <div className="h-6 bg-primary/10 border" />
                <div className="h-6 bg-primary/10 border" />
                <div className="h-6 bg-primary/10 border" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center min-[550px]:justify-start w-full">
          {[...Array(5)].map((_, index) => (
            <div
              className="p-2 w-full max-w-[300px] min-[550px]:max-w-full min-[550px]:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5"
              key={index}
            >
              <div className="shadow-lg border border-border flex flex-col animate-pulse-fast">
                <div className="h-72 border-b border-border bg-primary/10" />
                <div className="px-2 py-4 space-y-3">
                  <div className="h-6 border border-border" />
                  <div className="h-4 border w-20 border-border" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
