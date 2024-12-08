'use client';

import React, { useState, useEffect } from 'react';
import { KittensType } from '@/types/types';
import { fetchKittens } from '@/api/kittensApi';
import Kittens from '@/components/kittens/Kittens'
import Header from '@/components/common/Header'

const KittensPage: React.FC = () => {
    const [kittens, setKittens] = useState<KittensType[]>([]);

    // データ取得関数
    const getKittens = async () => {
        try {
            const response = await fetchKittens(); // APIから親猫データを取得
            setKittens(response);
        } catch (error) {
            console.error('親猫データの取得に失敗しました', error);
        }
    };

    useEffect(() => {
        getKittens();
    }, []);

    return (
        <>
        <Header />
        <Kittens kittens={kittens} getKittens={getKittens} />

    </>
    )
};

export default KittensPage;
