import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { AIAssistantPanel } from '@/components/ai-panel/assistant-panel'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your Store Name - AI Powered E-commerce',
  description: 'Modern store with AI capabilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <AIAssistantPanel />
        </ThemeProvider>
      </body>
    </html>
  )
}
