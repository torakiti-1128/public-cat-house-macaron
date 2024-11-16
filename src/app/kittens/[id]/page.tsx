'use client';
import React  from "react";
import { KittenDetail } from "@/components/pages/KittenDetail";
import { KittenDetailType } from "@/types/kitten";
import { Header } from "@/components/Layout/Heder";
import { Footer } from "@/components/Layout/Footer";
import { Access } from "@/components/Layout/Access";
import { CheckPoints } from "@/components/Layout/CheckPoints";


// テストデータ (1件のみ)
const testKittenDetail: KittenDetailType = {
    kittenId: "001",
    fatherCatId: 1,
    motherCatId: 2,
    description: `遊ぶの大好き！なでるとゴロゴロ喜ぶ甘えん坊さん♡綺麗なハチワレにベビーフェイス♡\n
    ※Open記念!! 3種ワクチン2回分 マイクロチップ 血統書込みの価格になります!`,
    breed: "スコティッシュフォールド",
    color: "ブルータビー&ホワイト",
    birthDate: "2024年05月11日",
    price: 150000,
};

// テストデータ (1件のみ)
const testKittenImages = ["/images/cats/cat1.jpg", "/images/cats/cat2.jpg", "/images/cats/cat3.jpg", "/images/cats/cat4.jpg"] 

export default function KittenDetailPage(){
    return(
        <>
        <Header />
        <KittenDetail kittenDetail={testKittenDetail} imageUrls={testKittenImages}/>
        <CheckPoints />
        <Access />
        <Footer />
        </>
    )
}