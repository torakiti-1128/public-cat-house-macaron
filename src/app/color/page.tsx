'use client'

import { useEffect, useState } from "react"
import ColorList from "@/components/color/ColorList"
import ColorForm from "@/components/color/ColorForm"

interface ColorDTO {
  colorId: number
  colorName: string
}

export default function ColorManagement() {
  const [colors, setColors] = useState<ColorDTO[]>([])

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

  // 初期データ取得
  useEffect(() => {
    fetchColors()
  }, [])

  const fetchColors = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/colors`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch colors")
      }
      const data = await response.json()
      setColors(data)
    } catch (error) {
      console.error("カラー一覧の取得に失敗しました", error)
    }
  }

  const handleAddColor = async (name: string) => {
    try {
      const body = new URLSearchParams()
      body.append("colorName", name) // URLエンコード形式でデータを構築

      const response = await fetch(`${API_BASE_URL}/colors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // 必須
        },
        body: body.toString(), // URLエンコードされた文字列を送信
      })

      if (!response.ok) {
        throw new Error("Failed to add color")
      }
      fetchColors()
    } catch (error) {
      console.error("カラーの追加に失敗しました", error)
    }
  }

  const handleUpdateColor = async (id: number, name: string) => {
    try {
      const body = new URLSearchParams()
      body.append("colorId", id.toString())
      body.append("colorName", name)

      const response = await fetch(`${API_BASE_URL}/colors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      })

      if (!response.ok) {
        throw new Error("Failed to update color")
      }
      fetchColors()
    } catch (error) {
      console.error("カラーの更新に失敗しました", error)
    }
  }

  const handleDeleteColor = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/colors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      if (!response.ok) {
        throw new Error("Failed to delete color")
      }
      fetchColors()
    } catch (error) {
      console.error("カラーの削除に失敗しました", error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">カラー管理</h1>
      <ColorForm onAdd={handleAddColor} />
      <ColorList
        colors={colors}
        onUpdate={handleUpdateColor}
        onDelete={handleDeleteColor}
      />
    </div>
  )
}