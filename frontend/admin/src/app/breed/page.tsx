'use client';

import { useEffect, useState } from 'react';
import BreedList from '@/components/breed/BreedList';
import BreedForm from '@/components/breed/BreedForm';
import {
    fetchBreeds,
    postBreed,
    updateBreed,
    deleteBreed,
} from '@/api/breedsApi';
import Header from '@/components/common/Header';
import { BreedsType } from '@/types/types';

export default function BreedManagement() {
    const [breeds, setBreeds] = useState<BreedsType[]>([]);

    // 初期データ取得
    useEffect(() => {
        fetchBreedsList();
    }, []);

    const fetchBreedsList = async () => {
        try {
            const data = await fetchBreeds();
            setBreeds(data);
        } catch (error) {
            console.error('猫種一覧の取得に失敗しました', error);
        }
    };

    const handleAddBreed = async (name: string) => {
        try {
            await postBreed(name);
            fetchBreedsList();
        } catch (error) {
            console.error('猫種の追加に失敗しました', error);
        }
    };

    const handleUpdateBreed = async (id: number, name: string) => {
        try {
            await updateBreed(id, name);
            fetchBreedsList();
        } catch (error) {
            console.error('猫種の更新に失敗しました', error);
        }
    };

    const handleDeleteBreed = async (id: number) => {
        try {
            await deleteBreed(id);
            fetchBreedsList();
        } catch (error) {
            console.error('猫種の削除に失敗しました', error);
        }
    };

    return (
        <div className="p-4">
            <Header />
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
