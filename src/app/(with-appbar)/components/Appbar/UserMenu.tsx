import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { logout } from '@/app/actions/authActions';
import { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOuside';

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useClickOutside(isOpen, menuRef, close);

  return (
    <div ref={menuRef} className="relative flex items-center justify-center">
      <button onClick={open} className="shrink-0">
        <Image
          src={session?.user?.image ?? ''}
          alt="Avatar"
          width={34}
          height={34}
          className="rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 -right-4 z-10">
          <div className="p-2 border shadow-lg bg-background">
            <form id="logout" name="logout" action={logout}>
              <button
                className="px-2 py-1 bg-primary text-primary-foreground w-max"
                type="submit"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
