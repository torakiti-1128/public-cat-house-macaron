'use client';

import React, { useState, useEffect } from 'react';
import ParentCats from '@/components/parent/ParentCats';
import { ParentCatsType } from '@/types/types';
import { fetchParentCats } from '@/api/parentCatsApi';
import Header from '@/components/common/Header';

const ParentCatsPage: React.FC = () => {
    const [parentCats, setParentCats] = useState<ParentCatsType[]>([]);

    // データ取得関数
    const getParentCats = async () => {
        try {
            const response = await fetchParentCats(); // APIから親猫データを取得
            setParentCats(response);
        } catch (error) {
            console.error('親猫データの取得に失敗しました', error);
        }
    };

    useEffect(() => {
        getParentCats();
    }, []);

    return (
        <>
            <Header />
            <ParentCats parentCats={parentCats} getParentCats={getParentCats} />
        </>
    );
};

export default ParentCatsPage;
