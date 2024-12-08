'use client'

import React, { useState, useEffect } from 'react'

interface CategorySelectProps<T> {
  data: T[]
  filterKey: keyof T
  categories: { label: string; value: string }[]
  onFilter: (filteredData: T[]) => void
}

const CategorySelect = <T extends object>({
  data,
  filterKey,
  categories,
  onFilter,
}: CategorySelectProps<T>) => {
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    const filteredData = selectedCategory
      ? data.filter((item) => String(item[filterKey]) === selectedCategory)
      : data
    onFilter(filteredData)
  }, [selectedCategory, data, filterKey, onFilter])

  return (
    <select
      className="bg-white rounded-full border-none p-3 shadow-md"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">全てのカテゴリ</option>
      {categories.map((category) => (
        <option key={category.value} value={category.label}>
          {category.label}
        </option>
      ))}
    </select>
  )
}

export default CategorySelect
