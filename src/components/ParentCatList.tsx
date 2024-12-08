'use client'

import React, { useState } from 'react'
import Title from '@/components/common/Title'
import SearchBox from '@/components/common/SearchBox'
import CategorySelect from '@/components/common/CategorySelect'
import { ParentCatListType } from '@/types/kitten'
import categoriesData from '@/data/categories.json'

interface ParentCatListProps {
  parentCats: ParentCatListType[]
}

const ParentCatList: React.FC<ParentCatListProps> = ({ parentCats }) => {
  const [filteredBySearch, setFilteredBySearch] =
    useState<ParentCatListType[]>(parentCats)
  const [filteredByCategory, setFilteredByCategory] =
    useState<ParentCatListType[]>(parentCats)

  const combinedFilteredParentCats = filteredBySearch.filter((cat) =>
    filteredByCategory.includes(cat)
  )

  return (
    <section className="text-gray-600 body-font bg-[#FDF7F2]">
      <div className="container px-10 py-8 mx-auto">
        <Title text="親猫の紹介" />
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:mt-0 mb-5">
          <div className="flex-grow sm:w-7/12">
            <SearchBox
              data={parentCats}
              filterKey="name"
              onFilter={setFilteredBySearch}
            />
          </div>
          <div className="sm:w-3/12">
            <CategorySelect
              data={parentCats}
              filterKey="breed"
              categories={categoriesData.categories}
              onFilter={setFilteredByCategory}
            />
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {combinedFilteredParentCats.map((cat) => (
            <div
              key={cat.parentCatId}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  className="h-48 rounded-lg w-full object-cover object-center mb-6"
                  src={cat.imageUrl}
                  alt={cat.name}
                />
                <h3 className="tracking-widest text-pink-500 text-xs font-medium title-font mb-1">
                  {cat.breed}
                </h3>
                <p className="text-sm text-gray-600">
                  名前：<span className="font-bold">{cat.name}</span>
                </p>
                <div className="flex items-center">
                  <p className="text-sm text-gray-600 mr-3">
                    性別：
                    <span className="font-bold">
                      {cat.sex == 0 ? 'パパ猫' : 'ママ猫'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    年齢：<span className="font-bold">{cat.age}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ParentCatList
