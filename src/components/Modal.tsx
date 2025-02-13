'use client';

import { createPortal } from 'react-dom';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
  return (
    open &&
    createPortal(
      <>
        <div onClick={onClose} className="fixed inset-0 z-10 bg-primary/20" />
        <div className="fixed top-16 left-8 right-8 bottom-8 z-20 bg-background">
          {children}
        </div>
      </>,
      document.getElementById('modal-id-root')!
    )
  );
}
