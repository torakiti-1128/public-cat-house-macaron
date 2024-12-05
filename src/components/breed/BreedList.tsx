import { useState } from "react"

interface BreedDTO {
  breedId: number
  breedName: string
}

interface Props {
  breeds: BreedDTO[]
  onUpdate: (id: number, newName: string) => void
  onDelete: (id: number) => void
}

export default function BreedList({ breeds, onUpdate, onDelete }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")

  const startEditing = (id: number, name: string) => {
    setEditingId(id)
    setEditingName(name)
  }

  const saveEdit = (id: number) => {
    onUpdate(id, editingName)
    setEditingId(null)
    setEditingName("")
  }

  const confirmDelete = (id: number) => {
    const confirmed = window.confirm("この猫種を削除してもよろしいですか？")
    if (confirmed) {
      onDelete(id)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {breeds.map((breed) => (
        <div
          key={breed.breedId}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between"
        >
          {editingId === breed.breedId ? (
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
          ) : (
            <p className="text-lg font-semibold mb-4">{breed.breedName}</p>
          )}
          <div className="flex gap-2">
            {editingId === breed.breedId ? (
              <button
                onClick={() => saveEdit(breed.breedId)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                保存
              </button>
            ) : (
              <button
                onClick={() => startEditing(breed.breedId, breed.breedName)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                編集
              </button>
            )}
            <button
              onClick={() => confirmDelete(breed.breedId)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              削除
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}