'use client'

import React, { useState, useEffect } from 'react'
import { AdoptionListType } from '@/types/kitten'
import Title from './common/Title'
import SearchBox from '@/components/common/SearchBox'
import { formatDateTimeToJapanese } from '@/hooks/datetimeConverter'
import Image from 'next/image'

interface AdoptionListProps {
  adoptionList: AdoptionListType[]
}

const AdoptionList: React.FC<AdoptionListProps> = ({ adoptionList }) => {
  const [filteredCats, setFilteredCats] = useState<AdoptionListType[]>([])
  const [searchQuery, setSearchQuery] = useState('') // 検索クエリの状態管理

  // 検索フィルタリング
  useEffect(() => {
    const filtered = adoptionList.filter(
      (cat) =>
        cat.name.includes(searchQuery) ||
        cat.breed.includes(searchQuery) ||
        cat.color.includes(searchQuery) ||
        cat.description.includes(searchQuery)
    )
    setFilteredCats(filtered)
  }, [adoptionList, searchQuery])

  return (
    <section className="text-gray-600 body-font bg-[#FDF7F2]">
      <div className="container px-10 py-8 mx-auto">
        <Title text="検索（例：マンチカン）" />

        {/* 検索バー */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:mt-0 mb-5">
          <SearchBox
            placeholder="名前や猫種で検索"
            onSearch={(query) => setSearchQuery(query)} // 入力値を状態に反映
          />
        </div>

        {/* 里親募集中カード */}
        <div className="flex flex-wrap -m-4">
          {filteredCats.map((cat) => (
            <div
              key={cat.adoptionCatId}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                {/* 猫の画像 */}
                <Image
                  className="h-48 rounded-lg w-full object-cover object-center mb-4"
                  src={cat.imageUrl}
                  alt={cat.name}
                />
                {/* 猫の基本情報 */}
                <div className="mb-4">
                  <h3 className="text-pink-500 text-sm font-semibold mb-1">
                    {cat.breed}
                  </h3>
                  <h2 className="text-lg text-gray-900 font-bold mb-1">
                    {cat.name}
                  </h2>
                  <p className="text-gray-700 text-sm">{cat.description}</p>
                </div>
                {/* 猫の詳細情報 */}
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between mb-1">
                    <span>性別:</span>
                    <span className="font-medium">
                      {cat.sex === 0 ? '男の子' : '女の子'}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>カラー:</span>
                    <span className="font-medium">{cat.color}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>生年月日:</span>
                    <span className="font-medium">
                      {formatDateTimeToJapanese(cat.birthDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>年齢:</span>
                    <span className="font-medium">{cat.age}歳</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdoptionList
