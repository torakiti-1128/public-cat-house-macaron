'use client';
import React from 'react';

import { Header } from '@/components/Layout/Heder';
import { Footer } from '@/components/Layout/Footer';
import KittenList from '@/components/KittensList';

import { KittenListType } from '@/types/kitten';

const testKittens: KittenListType[] = [
  { kittenId: 1, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat1.jpg" },
  { kittenId: 2, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat2.jpg" },
  { kittenId: 3, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat3.jpg" },
  { kittenId: 4, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat4.jpg" },
  { kittenId: 5, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat5.jpg" },
  { kittenId: 6, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat6.jpg" },
  { kittenId: 7, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat7.jpg" },
  { kittenId: 8, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat8.jpg" },
  { kittenId: 9, breed: "スコティッシュフィールド", tranStatus: "", url: "/images/cats/cat9.jpg" },
];

export default function KittenListPage() {
  return (
    <>
    <Header />
    <KittenList kittens={testKittens} />
    <Footer />
    </>
  );
}