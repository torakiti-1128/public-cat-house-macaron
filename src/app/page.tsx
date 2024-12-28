'use client'
import React, { useEffect, useState } from 'react'
import Concept from '@/components/Concept'
import TopPageSlideShow from '@/components/KittensSlideShow'
import { KittenListType } from '@/types/kitten'
import { PulseLoader } from 'react-spinners'

export default function Home() {
  const [kittens, setKittens] = useState<KittenListType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 子猫情報をフェッチする関数
    const fetchKittens = async () => {
      try {
        const endpoint = process.env.NEXT_PUBLIC_BASE_URL + '/kittens'
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: KittenListType[] = await response.json() // 型アサーション
        setKittens(data) // データを直接セット
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

  if (loading || error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader size={15} color="#EDDFE0" />
      </div>
    )
  }

  return (
    <>
      <Concept />
      <TopPageSlideShow kittens={kittens} status="募集中" />
    </>
  )
}
