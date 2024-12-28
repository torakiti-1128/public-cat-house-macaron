'use client'
import React, { useState, useEffect } from 'react'
import ParentCatList from '@/components/ParentCatList'
import { ParentCatListType } from '@/types/kitten'
import ErrorContent from '@/components/ErrorContent'
import { PulseLoader } from 'react-spinners'
import Image from 'next/image'

export default function KittenListPage() {
  const [parentCats, setParentCats] = useState<ParentCatListType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // データをフェッチする関数
    const fetchParentCats = async () => {
      try {
        const endpoint = process.env.NEXT_PUBLIC_BASE_URL + '/parent'
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setParentCats(data) // フェッチしたデータを状態にセット
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

    fetchParentCats()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader size={15} color="#EDDFE0" /> {/* スピナーと色の指定 */}
      </div>
    )
  }

  if (error) {
    const errorMessage = [
      '親猫一覧の取得に失敗しました。',
      '更新しても表示されない場合は下記メールアドレスまでお問い合わせください。',
      'cathouseem@gmail.com',
    ]

    return (
      <ErrorContent error={errorMessage}>
        <Image
          src="/images/not-found.JPG"
          alt="写真"
          className="max-w-xs rounded shadow-lg"
        />
      </ErrorContent>
    )
  }

  return (
    <>
      <ParentCatList parentCats={parentCats} />
    </>
  )
}
