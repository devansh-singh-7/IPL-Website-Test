import type { Metadata } from 'next'
import { TranslationProvider } from '@/contexts/TranslationContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: "Indian Penpals&apos; League",
  description: "Love, Friendship & Humanity — A confederation of friends united to serve communities.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TranslationProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="grow">
              {children}
            </main>
            <Footer />
          </div>
        </TranslationProvider>
      </body>
    </html>
  )
}
