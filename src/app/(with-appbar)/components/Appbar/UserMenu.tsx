import Image from 'next/image';
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { logout } from '@/app/actions/authActions';
import useClickOutside from '@/hooks/useClickOuside';

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useClickOutside(isOpen, menuRef, closeMenu);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeMenu();
  };

  return (
    <div ref={menuRef} className="relative flex items-center justify-center">
      <button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="shrink-0"
      >
        <Image
          src={session?.user?.image ?? '/default-avatar.png'}
          alt="User Avatar"
          width={34}
          height={34}
          className="rounded-full"
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 -right-4 z-10 p-2 border shadow-lg bg-background"
          role="menu"
          onKeyDown={handleKeyDown}
        >
          <form id="logout" name="logout" action={logout}>
            <button
              className="px-2 py-1 bg-primary text-primary-foreground w-max"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
