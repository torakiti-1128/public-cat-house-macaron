'use client';

import { useEffect, useState } from 'react';
import BreedList from '@/components/breed/BreedList';
import BreedForm from '@/components/breed/BreedForm';

interface BreedDTO {
    breedId: number;
    breedName: string;
}

export default function BreedManagement() {
    const [breeds, setBreeds] = useState<BreedDTO[]>([]);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    // 初期データ取得
    useEffect(() => {
        fetchBreeds();
    }, []);

    const fetchBreeds = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/breeds`);
            if (!response.ok) {
                throw new Error('Failed to fetch breeds');
            }
            const data = await response.json();
            setBreeds(data);
        } catch (error) {
            console.error('猫種一覧の取得に失敗しました', error);
        }
    };

    const handleAddBreed = async (name: string) => {
        try {
            const body = new URLSearchParams();
            body.append('breedName', name);

            const response = await fetch(`${API_BASE_URL}/breeds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body.toString(),
            });

            if (!response.ok) {
                throw new Error('Failed to add breed');
            }
            fetchBreeds();
        } catch (error) {
            console.error('猫種の追加に失敗しました', error);
        }
    };

    const handleUpdateBreed = async (id: number, name: string) => {
        try {
            const body = new URLSearchParams();
            body.append('breedId', id.toString());
            body.append('breedName', name);

            const response = await fetch(`${API_BASE_URL}/breeds/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body.toString(),
            });

            if (!response.ok) {
                throw new Error('Failed to update breed');
            }
            fetchBreeds();
        } catch (error) {
            console.error('猫種の更新に失敗しました', error);
        }
    };

    const handleDeleteBreed = async (id: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/breeds/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete breed');
            }
            fetchBreeds();
        } catch (error) {
            console.error('猫種の削除に失敗しました', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">猫種管理</h1>
            <BreedForm onAdd={handleAddBreed} />
            <BreedList
                breeds={breeds}
                onUpdate={handleUpdateBreed}
                onDelete={handleDeleteBreed}
            />
        </div>
    );
}
