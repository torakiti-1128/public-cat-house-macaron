import React from 'react'
import '../styles/globals.css'
import Header from '@/components/shared/Header'
import CheckPoints from '@/components/shared/CheckPoints'
import Access from '@/components/shared/Access'
import Footer from '@/components/shared/Footer'

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
