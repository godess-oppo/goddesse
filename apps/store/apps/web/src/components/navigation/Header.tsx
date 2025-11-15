'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/search/SearchBar';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart, 
  Search 
} from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Brands', href: '/brands' },
    { name: 'Try-On', href: '/try-on' },
  ];

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-pink-600">
              FashionPod
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium ${
                  pathname === item.href
                    ? 'text-pink-600'
                    : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Toggle for Mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Search Bar for Desktop */}
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 rounded-full hover:bg-gray-100 relative">
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <Link href="/profile" className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden py-4">
            <SearchBar />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium ${
                    pathname === item.href
                      ? 'text-pink-600'
                      : 'text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
