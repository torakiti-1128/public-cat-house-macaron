'use client';

import { useEffect, useState } from 'react';
import ColorList from '@/components/color/ColorList';
import ColorForm from '@/components/color/ColorForm';
import {
    fetchColors,
    postColor,
    updateColor,
    deleteColor,
} from '@/api/colorsApi';
import Header from '@/components/common/Header';
import { ColorsType } from '@/types/types';

export default function ColorPage() {
    const [colors, setColors] = useState<ColorsType[]>([]);

    // 初期データ取得
    useEffect(() => {
        fetchColorsList();
    }, []);

    const fetchColorsList = async () => {
        try {
            const data = await fetchColors();
            setColors(data);
        } catch (error) {
            console.error('カラー一覧の取得に失敗しました', error);
        }
    };

    const handleAddColor = async (name: string) => {
        try {
            await postColor(name);
            fetchColorsList();
        } catch (error) {
            console.error('カラーの追加に失敗しました', error);
        }
    };

    const handleUpdateColor = async (id: number, name: string) => {
        try {
            await updateColor(id, name);
            fetchColorsList();
        } catch (error) {
            console.error('カラーの更新に失敗しました', error);
        }
    };

    const handleDeleteColor = async (id: number) => {
        try {
            await deleteColor(id);
            fetchColorsList();
        } catch (error) {
            console.error('カラーの削除に失敗しました', error);
        }
    };

    return (
        <div className="p-4">
            <Header />
            <h1 className="text-2xl font-bold mb-4">カラー管理</h1>
            <ColorForm onAdd={handleAddColor} />
            <ColorList
                colors={colors}
                onUpdate={handleUpdateColor}
                onDelete={handleDeleteColor}
            />
        </div>
    );
}
