'use client';

import Spinner from '@/components/Spinner';
import { useSession } from 'next-auth/react';

export default function UserInfo() {
  const { data, status } = useSession();

  return (
    <div className="p-4">
      <div className="flex">
        {status === 'loading' ? <Spinner /> : <p>{data?.user?.email}</p>}
      </div>
    </div>
  );
}
