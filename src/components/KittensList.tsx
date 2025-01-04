'use client'

import React, { useState, useEffect } from 'react'
import { KittenListType } from '@/types/kitten'
import Title from '@/components/common/Title'
import SearchBox from '@/components/common/SearchBox'
import { formatDateTimeToJapanese } from '@/hooks/datetimeConverter'
import { useRouter } from 'next/navigation'
import Button from './common/Button'

interface KittenListProps {
  kittens: KittenListType[]
  status: '募集中' | '商談中' // 表示したい状態を指定
}

const KittenList: React.FC<KittenListProps> = ({ kittens, status }) => {
  const [filteredKittens, setFilteredKittens] = useState<KittenListType[]>([])
  const [searchQuery, setSearchQuery] = useState('') // 検索文字列の状態管理
  const router = useRouter()

  const handleViewDetails = (kittenId: number) => {
    router.push(
      `/kittens/${kittenId}?kittens=${encodeURIComponent(JSON.stringify(kittens))}`
    )
  }

  // 状態と検索文字列でフィルタリング
  useEffect(() => {
    const filteredByStatus = kittens?.filter(
      (kitten) =>
        kitten.tranState === status &&
        (kitten.breed.includes(searchQuery) ||
          kitten.kittenId.toString().includes(searchQuery))
    )
    setFilteredKittens(filteredByStatus)
  }, [kittens, status, searchQuery])

  return (
    <section className="text-gray-600 body-font bg-[#FDF7F2] px-10 py-8">
      <div className="container mx-auto">
        <Title text="子猫一覧" />

        {/* 検索バー */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:mt-0 mb-5">
          <SearchBox
            placeholder="検索（例：マンチカン）"
            onSearch={(query) => setSearchQuery(query)} // 検索文字列の変更を受け取る
          />
        </div>

        {/* フィルタリングされた子猫一覧 */}
        <div className="flex flex-wrap -m-4">
          {filteredKittens?.map((kitten) => (
            <div
              key={kitten.kittenId}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <a
                onClick={() => handleViewDetails(kitten.kittenId)}
                className="block bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  className="w-full h-48 object-cover rounded-lg mb-6"
                  src={kitten.imageUrl}
                  alt={`子猫 ${kitten.kittenId}`}
                />
                <h3 className="tracking-widest text-pink-500 text-xs font-medium title-font mb-2">
                  {kitten.breed}
                </h3>
                <h2 className="text-gray-900 text-lg font-medium mb-2">
                  子猫番号: {kitten.kittenId}
                </h2>
                <p style={{ fontFamily: 'Paratino, serif' }}>
                  取引状態：{kitten.tranState}
                </p>
                <p style={{ fontFamily: 'Paratino, serif' }}>
                  更新日時：
                  <span>{formatDateTimeToJapanese(kitten.createdAt)}</span>
                </p>
              </a>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 flex justify-center items-center">
          <Button text={'ご家族が決まった子猫を見る'} link={'/family'} />
        </div>
      </div>
    </section>
  )
}

export default KittenList
