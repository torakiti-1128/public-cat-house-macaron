import { useState } from "react"

interface Props {
  onAdd: (name: string) => void
}

export default function ColorForm({ onAdd }: Props) {
  const [colorName, setColorName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (colorName.trim()) {
      onAdd(colorName)
      setColorName("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-8 mb-8">
      <input
        type="text"
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
        placeholder="新しいカラー名を入力"
        className="border border-gray-300 p-2 flex-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        追加
      </button>
    </form>
  )
}