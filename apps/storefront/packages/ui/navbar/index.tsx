import Link from 'next/link';
import type { ReactNode } from 'react';

interface NavbarProps {
  children: ReactNode;
}

export const Navbar = ({ children }: NavbarProps) => (
  <nav className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        ShopifyClone
      </Link>
      {children}
    </div>
  </nav>
);
