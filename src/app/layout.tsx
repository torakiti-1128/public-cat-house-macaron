import React from 'react'
import '../styles/globals.css'
import Header from '@/components/shared/Header'
import CheckPoints from '@/components/shared/CheckPoints'
import Access from '@/components/shared/Access'
import Footer from '@/components/shared/Footer'

export const metadata = {
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
      <link rel="icon" href="/favicon.ico" />
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <CheckPoints />
        <Access />
        <Footer />
      </body>
    </html>
  )
}
