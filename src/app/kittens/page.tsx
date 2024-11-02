'use client';
import React, { useEffect, useState } from 'react';
import { fetchAllRecruitingKittensWithMedia } from "@/api/kitten/select";
import { KittenSelectMediaType } from '@/types/kitten';
import { Header } from '@/components/Heder';
import { Footer } from '@/components/Footer';
import { KittenList } from '@/components/KittensList';
import { TabCat } from '@/components/TabCat';

const testKittens: KittenSelectMediaType[] = [
  { kittenId: 1, species: "スコティッシュフィールド", url: "/images/cats/cat1.jpg" },
  { kittenId: 2, species: "スコティッシュフィールド", url: "/images/cats/cat2.jpg" },
  { kittenId: 3, species: "スコティッシュフィールド", url: "/images/cats/cat3.jpg" },
  { kittenId: 4, species: "スコティッシュフィールド", url: "/images/cats/cat4.jpg" },
  { kittenId: 5, species: "スコティッシュフィールド", url: "/images/cats/cat5.jpg" },
  { kittenId: 6, species: "スコティッシュフィールド", url: "/images/cats/cat6.jpg" },
  { kittenId: 7, species: "スコティッシュフィールド", url: "/images/cats/cat7.jpg" },
  { kittenId: 8, species: "スコティッシュフィールド", url: "/images/cats/cat8.jpg" },
  { kittenId: 9, species: "スコティッシュフィールド", url: "/images/cats/cat9.jpg" },
];

export default function KittenListPage() {
  const [kittens, setKittens] = useState<KittenSelectMediaType[]>([]);

  useEffect(() => {
    const fetchKittens = async () => {
      try {
        const data = await fetchAllRecruitingKittensWithMedia();
        setKittens(data);
      } 
      catch (err) {
        console.log(err);
      } 
    };

    fetchKittens();
  }, []);

  return (
    <>
    <Header />
    <KittenList kittens={testKittens} />
    <Footer />
    </>
  );
}