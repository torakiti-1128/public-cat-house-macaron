'use client';
import React from "react";
import { KittenDetail } from "@/components/pages/KittenDetail";
import { KittenDetailType, ParentCatKittenDetailType } from "@/types/kitten";
import { Header } from "@/components/Layout/Heder";
import { Footer } from "@/components/Layout/Footer";
import { Access } from "@/components/Layout/Access";
import { CheckPoints } from "@/components/Layout/CheckPoints";

const testKittenDetail: KittenDetailType = {
    kittenId: "001",
    fatherCatId: 1,
    motherCatId: 2,
    description: "甘えん坊で遊ぶのが大好き！",
    breed: "スコティッシュフォールド",
    color: "ブルータビー&ホワイト",
    birthDate: "2024年05月11日",
    price: 150000,
};

const testKittenImages = [
    "/images/cats/cat1.JPG",
    "/images/cats/cat2.JPG",
    "/images/cats/cat3.JPG",
    "/images/cats/cat4.JPG"
];

const testParentCats: ParentCatKittenDetailType[] = [
    {
        parentCatId: 1,
        name: "タイガー",
        sex: "male",
        breed: "スコティッシュフォールド",
        description: "野性味あふれる見た目で、活発な性格が特徴の父猫です。",
        url: "/images/cats/cat9.JPG",
    },
    {
        parentCatId: 2,
        name: "サクラ",
        sex: "female",
        breed: "メインクーン",
        description: "元気いっぱいで遊び好きな、華やかな柄の母猫です。",
        url: "/images/cats/cat8.JPG",
    }
];

const videoUrl = "/images/cat-test.mov";

export default function KittenDetailPage() {
    return (
        <>
            <Header />
            <KittenDetail
                kittenDetail={testKittenDetail}
                imageUrls={testKittenImages}
                parentCats={testParentCats}
                videoUrl={videoUrl}
            />
            <CheckPoints />
            <Access />
            <Footer />
        </>
    );
}