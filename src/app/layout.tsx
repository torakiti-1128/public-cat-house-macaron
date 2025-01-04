import React from 'react'
import { Metadata } from 'next'
import '../styles/globals.css'
import Header from '@/components/shared/Header'
import CheckPoints from '@/components/shared/CheckPoints'
import Access from '@/components/shared/Access'
import Footer from '@/components/shared/Footer'
import Gallery from '@/components/shared/Gallery'

export const metadata: Metadata  = {
  title: 'Cat House Macaron | 福岡県北九州の海外猫専門ブリーダー',
  description:
    '福岡県の北九州にあるCat House Macaronは、マンチカン、ミヌエット、スコティッシュフォールド、ゴールデンブリティッシュなど、高品質で愛らしい海外猫を取り扱う信頼のブリーダーサイトです。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <CheckPoints />
        <Access />
        <Gallery />
        <Footer />
      </body>
    </html>
  )
}
