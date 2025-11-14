import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Storefront - Modern E-commerce Platform',
  description: 'A complete e-commerce solution built with Next.js and NestJS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <h1 className="text-xl font-bold text-blue-600">Storefront</h1>
              <nav>
                <a href="/" className="mx-2 text-gray-700 hover:text-blue-600">
                  Home
                </a>
                <a href="/products" className="mx-2 text-gray-700 hover:text-blue-600">
                  Products
                </a>
                <a href="/cart" className="mx-2 text-gray-700 hover:text-blue-600">
                  Cart
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2023 Storefront. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
