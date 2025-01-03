'use client'

import React, { useState } from 'react'
import navigationData from '@/data/navigation.json' // JSONファイルをインポート

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMouseEnter = (index: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId) // 既存のタイムアウトをキャンセル
    }
    setOpenIndex(index)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setOpenIndex(null) // 2秒後に閉じる
    }, 1000)
    setTimeoutId(id)
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="container mx-auto flex flex-col items-center">
        {/* タイトル */}
        <div className="text-center mt-10 mb-4 hidden md:flex flex-col items-center">
          <h1
            className="font-bold text-4xl text-black"
            style={{ fontFamily: 'Paratino, serif' }}
          >
            Cat House Macaron
          </h1>
          <p
            className="text-gray-400 text-lg"
            style={{ fontFamily: 'Paratino, serif' }}
          >
            Life with a cat
          </p>
        </div>
        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex space-x-8 font-hina-mincho mt-1 mb-10">
          <a
            href="/"
            className="nav-link text-black font-medium hover:text-gray-800 transition"
          >
            ホーム
          </a>

          {navigationData.categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(categoryIndex)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="nav-link text-black font-medium hover:text-gray-800 transition">
                {category.title}
              </button>
              <ul
                className={`absolute left-0 p-5 mt-2 space-y-3 bg-white border border-gray-200 rounded-lg shadow-md z-10 transition-opacity duration-200 ${
                  openIndex === categoryIndex
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-black hover:text-gray-700 hover:bg-gray-100 transition block whitespace-nowrap"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* モバイル画面 */}
      <div className="md:hidden flex items-center justify-between w-full mt-5 mb-6 px-4">
        <button
          onClick={toggleMenu}
          className="menu-button text-black focus:outline-none w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div
          className="flex-grow text-center"
          style={{ transform: 'translateX(-20px)' }}
        >
          <h1
            className="font-bold text-2xl"
            style={{ fontFamily: 'Paratino, serif' }}
          >
            Cat House Macaron
          </h1>
          <p className="text-gray-400 text-sm">Life with a cat</p>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleMenu}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="space-y-6 max-h-[90vh] overflow-y-auto">
              {navigationData.categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-3">
                  {/* タイトル部分 */}
                  <h1 className="text-lg font-semibold text-black border-b border-gray-300 pb-2">
                    {category.title}
                  </h1>

                  {/* リンク部分 */}
                  <ul className="space-y-2 pl-4">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="block text-gray-700 hover:text-blue-500 transition-all duration-300 text-left"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
