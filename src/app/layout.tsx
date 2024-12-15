import React from 'react'
import '../styles/globals.css'
import Header from '@/components/layout/Header'
import CheckPoints from '@/components/layout/CheckPoints'
import Access from '@/components/layout/Access'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Cat House Macaron',
  description: '一般家庭でブリードしています。',
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
        <Footer />
      </body>
    </html>
  )
}
