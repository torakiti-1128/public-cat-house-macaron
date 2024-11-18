'use client';

import React, { useState } from 'react';
import categoriesData from '@/data/categories.json';

interface CategorySelectProps {
  onChange: (value: string) => void; // 選択された値を親コンポーネントに渡す
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCategory(value);
    onChange(value); // 親コンポーネントに値を渡す
  };

  return (
    <div className="bg-white rounded-full border-none p-3 mb-4 shadow-md mx-4 lg:mx-0">
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleChange}
        className="w-full bg-white rounded-full border-none text-gray-700 px-3 focus:outline-none"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <option value="" disabled>
          カテゴリー
        </option>
        {categoriesData.categories.map((category) => (
          <option
            key={category.value}
            value={category.value}
          >
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;