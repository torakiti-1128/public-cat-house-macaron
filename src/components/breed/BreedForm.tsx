import { useState } from 'react';

interface Props {
    onAdd: (name: string) => void;
}

export default function BreedForm({ onAdd }: Props) {
    const [breedName, setBreedName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (breedName.trim()) {
            onAdd(breedName);
            setBreedName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-8 mb-8">
            <input
                type="text"
                value={breedName}
                onChange={(e) => setBreedName(e.target.value)}
                placeholder="新しい猫種名を入力"
                className="border border-gray-300 p-2 flex-1"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                追加
            </button>
        </form>
    );
}
