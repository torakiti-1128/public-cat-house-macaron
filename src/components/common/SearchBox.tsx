'use client'

import React, { useState, useEffect } from 'react'

interface SearchBoxProps<T> {
  data: T[]
  filterKey: keyof T
  onFilter: (filteredData: T[]) => void
}

const SearchBox = <T extends object>({
  data,
  filterKey,
  onFilter,
}: SearchBoxProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const filteredData = data.filter((item) =>
      String(item[filterKey]).toLowerCase().includes(searchQuery.toLowerCase())
    )
    onFilter(filteredData)
  }, [searchQuery, data, filterKey, onFilter])

  return (
    <div className="bg-white rounded-full border-none p-3 shadow-md">
      <input
        type="text"
        placeholder="検索..."
        className="focus:outline-none w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

export default SearchBox
