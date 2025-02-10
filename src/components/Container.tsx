import { cn } from '@/lib/utils';

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('p-4 max-w-[112.5rem] mx-auto', className)}>{children}</div>;
}
