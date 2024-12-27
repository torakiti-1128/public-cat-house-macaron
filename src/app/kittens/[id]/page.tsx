'use client'

import React, { useEffect, useState } from 'react'
import KittenDetail from '@/components/KittenDetail'
import { KittenDetailType, ParentCatKittenDetailType } from '@/types/kitten'
import { PulseLoader } from 'react-spinners' // スピナーをインポート
import ErrorContent from '@/components/ErrorContent'

interface KittenDetailPageProps {
  params: {
    id: string // URLのパラメータ
  }
}

export default function KittenDetailPage({ params }: KittenDetailPageProps) {
  const kittenId = Number(params.id) // idを数値型に変換

  const [kittenDetail, setKittenDetail] = useState<KittenDetailType>()
  const [parentCats, setParentCats] = useState<ParentCatKittenDetailType[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchKittenDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/kittens/${kittenId}`
        )
        if (!response.ok) {
          throw new Error('子猫情報の取得に失敗しました。')
        }
        const data = await response.json()
        setKittenDetail(data)

        // 親猫情報の取得
        const parentCatPromises = []
        if (data.fatherCatId) {
          parentCatPromises.push(fetchParentCat(data.fatherCatId))
        }
        if (data.motherCatId) {
          parentCatPromises.push(fetchParentCat(data.motherCatId))
        }

        const parentCatsData = await Promise.all(parentCatPromises)
        setParentCats(parentCatsData)
      } catch (error: unknown) {
        console.error('Fetch error:', error)
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred.')
        }
      } finally {
        setLoading(false)
      }
    }

    const fetchParentCat = async (
      parentCatId: number
    ): Promise<ParentCatKittenDetailType> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/parent/${parentCatId}`
      )
      if (!response.ok) {
        throw new Error(`親猫情報の取得に失敗しました (ID: ${parentCatId})`)
      }
      return response.json()
    }

    fetchKittenDetail()
  }, [kittenId])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader size={15} color="#EDDFE0" /> {/* スピナーを表示 */}
      </div>
    )
  }

  if (error) {
    const errorMessage = [
      '子猫詳細の取得に失敗しました。',
      '更新しても表示されない場合は下記メールアドレスまでお問い合わせください。',
      'cathouseem@gmail.com',
    ]
    return (
      <ErrorContent error={errorMessage}>
        <img
          src="/images/not-found.JPG"
          alt="写真"
          className="max-w-xs rounded shadow-lg"
        />
      </ErrorContent>
    )
  }

  if (!kittenDetail) {
    return <p>該当する子猫情報が見つかりません。</p>
  }

  return (
    <KittenDetail
      kittenDetail={kittenDetail}
      imageUrls={kittenDetail.imageUrls}
      parentCats={parentCats}
      videoUrl={kittenDetail.videoUrl}
      tranState="募集中"
    />
  )
}
