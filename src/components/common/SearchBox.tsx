'use client'

import React, { useState } from 'react'

interface SearchBoxProps {
  placeholder?: string // プレースホルダーのテキスト
  onSearch: (query: string) => void // 検索文字列の変更時に呼び出される関数
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = '検索',
  onSearch,
}) => {
  const [query, setQuery] = useState('') // 入力文字列の状態管理

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value) // 入力が変更されるたびに親コンポーネントに通知
  }

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  )
}

export default SearchBox
