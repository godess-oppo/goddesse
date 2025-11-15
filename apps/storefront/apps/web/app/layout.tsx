import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: 'RISN — Your Fashion Intelligence.',
  description: 'AI-driven fashion that adapts to you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} dark`}>
      <body className="bg-risn-dark text-risn-gray-100 antialiased selection:bg-risn-blue selection:text-risn-dark">
        {children}
      </body>
    </html>
  )
}
