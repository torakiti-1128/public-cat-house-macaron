'use client';

import React, { useState, useEffect } from 'react';
import AdoptionCats from '@/components/adoption/AdoptionCats';
import { AdoptionCatsType } from '@/types/types';
import { fetchAdoptionCats } from '@/api/adoptionCatsApi';
import Header from '@/components/common/Header';

const AdoptionCatsPage: React.FC = () => {
    const [adoptionCats, setAdoptionCats] = useState<AdoptionCatsType[]>([]);

    // データ取得関数
    const getAdoptionCats = async () => {
        try {
            const response = await fetchAdoptionCats(); // APIから親猫データを取得
            setAdoptionCats(response);
        } catch (error) {
            console.error('親猫データの取得に失敗しました', error);
        }
    };

    useEffect(() => {
        getAdoptionCats();
    }, []);

    return (
        <>
            <Header />
            <AdoptionCats
                adoptionCats={adoptionCats}
                getAdoptionCats={getAdoptionCats}
            />
        </>
    );
};

export default AdoptionCatsPage;
