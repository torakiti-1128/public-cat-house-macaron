'use client'
import React, { useState, useEffect } from 'react'
import ParentCatList from '@/components/ParentCatList'
import { ParentCatListType } from '@/types/kitten'
import ErrorContent from '@/components/ErrorContent'
import { PulseLoader } from 'react-spinners'

export default function KittenListPage() {
  const [parentCats, setParentCats] = useState<ParentCatListType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // データをフェッチする関数
    const fetchParentCats = async () => {
      try {
        const response = await fetch('http://localhost:8080/parent')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setParentCats(data) // フェッチしたデータを状態にセット
      } catch (err: any) {
        console.error('Fetch error:', err)
        setError(err.message)
      } finally {
        setLoading(false) // フェッチ完了後にローディングを終了
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
      "親猫一覧の取得に失敗しました。",
      "更新しても表示されない場合は下記メールアドレスまでお問い合わせください。",
      "cathouseem@gmail.com"
    ];
    
    return (
      <ErrorContent error={errorMessage}>
      <img src="/images/not-found.JPG" alt="写真" className="max-w-xs rounded shadow-lg" />
      </ErrorContent>
    )
  }

  return (
    <>
      <ParentCatList parentCats={parentCats} />
    </>
  )
}
