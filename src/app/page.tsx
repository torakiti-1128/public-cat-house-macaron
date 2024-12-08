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
        const response = await fetch('http://localhost:8080/kittens')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: KittenListType[] = await response.json() // 型アサーション
        setKittens(data) // データを直接セット
      } catch (err: any) {
        console.error('Fetch error:', err)
        setError(err.message) // エラーメッセージを保存
      } finally {
        setLoading(false) // ローディング終了
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
  
  return (
    <>
      <Concept />
      <TopPageSlideShow kittens={kittens} />
    </>
  )
}
