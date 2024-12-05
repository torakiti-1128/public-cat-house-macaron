'use client';

import React, { useEffect, useState } from 'react';
import KittensList from '@/components/Kittens';
import { KittensType } from '@/types/getTypes';
import apiClient from '@/lib/axios';

const KittensPage = () => {
    const [kittens, setKittens] = useState<KittensType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKittens = async () => {
            try {
                const response = await apiClient.get<KittensType[]>('/kittens');
                setKittens(response.data);
            } catch (error) {
                console.error('子猫データの取得に失敗しました:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchKittens();
    }, []);

    if (loading) {
        return <p>読み込み中...</p>;
    }

    return <KittensList kittens={kittens} />;
};

export default KittensPage;
