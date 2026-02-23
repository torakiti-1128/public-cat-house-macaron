'use client'
import React, { useEffect, useState } from 'react'
import Concept from '@/components/Concept'
import TopPageSlideShow from '@/components/KittensSlideShow'
import { KittenListType } from '@/types/kitten'
import { PulseLoader } from 'react-spinners'
import MacaronCatSlideShow from '@/components/MacaronCatSlideShow'

export default function Home() {
  const [kittens, setKittens] = useState<KittenListType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 子猫情報をフェッチする関数
    const fetchKittens = async () => {
      try {
        const endpoint = process.env.NEXT_PUBLIC_BASE_URL + '/kittens'
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: KittenListType[] = await response.json()
        setKittens(data) // データを直接セット
      } catch (error) {
        console.error('Fetch error:', error)
        if (error instanceof Error) {
          console.error('Fetch error:', error.message)
        } else {
          console.error('予期せぬエラー')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchKittens()
  }, [])

  return (
    <>
      <Concept />
      <MacaronCatSlideShow />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader size={15} color="#EDDFE0" />
        </div>
      ) : (
        <TopPageSlideShow kittens={kittens} status={['募集中', '商談中']} />
      )}
    </>
  )
}
