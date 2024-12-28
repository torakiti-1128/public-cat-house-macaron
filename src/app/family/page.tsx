'use client'

import React, { useState, useEffect } from 'react'
import FamilyKittenList from '@/components/FamilyKittensList'
import { KittenListType } from '@/types/kitten'
import { PulseLoader } from 'react-spinners' // スピナーをインポート
import ErrorContent from '@/components/ErrorContent'

export default function FamilyKittenListPage() {
  const [kittens, setKittens] = useState<KittenListType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>('')

  useEffect(() => {
    // 子猫情報をフェッチする関数
    const fetchKittens = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/kittens/`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: KittenListType[] = await response.json()
        setKittens(data)
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

    fetchKittens()
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
      '子猫一覧の取得に失敗しました。',
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

  return (
    <>
      <FamilyKittenList kittens={kittens} status="譲渡済" />
    </>
  )
}
