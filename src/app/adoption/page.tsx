'use client'
import React, { useEffect, useState } from 'react'
import AdoptionList from '@/components/AdoptionList'
import { AdoptionListType } from '@/types/kitten'
import ErrorContent from '@/components/ErrorContent'
import { PulseLoader } from 'react-spinners'

export default function AdoptionPages() {
  const [adoptionCats, setAdoptionCats] = useState<AdoptionListType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // データをフェッチする関数
    const fetchParentCats = async () => {
      try {
        const endpoint = process.env.NEXT_PUBLIC_BASE_URL + '/adoption'
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setAdoptionCats(data) // フェッチしたデータを状態にセット
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
      <AdoptionList adoptionList={adoptionCats} />
    </>
  )
}
