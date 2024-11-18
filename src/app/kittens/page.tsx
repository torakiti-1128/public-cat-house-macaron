'use client';
import React from 'react';

import { Header } from '@/components/Layout/Heder';
import { Footer } from '@/components/Layout/Footer';
import KittenList from '@/components/KittensList';

import { KittenListType } from '@/types/kitten';
// import CatTabNavigation from '@/components/CatTabNavigation';

const testKittens: KittenListType[] = [
  { kittenId: 1, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat1.JPG" },
  { kittenId: 2, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat2.JPG" },
  { kittenId: 3, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat3.JPG" },
  { kittenId: 4, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat10.JPG" },
  { kittenId: 5, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat5.JPG" },
  { kittenId: 6, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat6.JPG" },
  { kittenId: 7, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat7.JPG" },
  { kittenId: 8, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat8.JPG" },
  { kittenId: 9, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat9.JPG" },
];

export default function KittenListPage() {
  return (
    <>
    <Header />
    {/* <CatTabNavigation /> */}
    <KittenList kittens={testKittens} />
    <Footer />
    </>
  );
}