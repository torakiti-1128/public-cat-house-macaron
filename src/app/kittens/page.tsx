'use client';
import React, { useEffect, useState } from 'react';
import { fetchAllRecruitingKittensWithMedia } from "@/api/kitten/select";
import { KittenSelectMediaType } from '@/types/kitten';
import { Header } from '@/components/Heder';
import { Concept } from '@/components/Concept';
import TopPageSlideShow from '@/components/TopPageSlideShow';
import { Contact } from '@/components/Contact';
import { Concept2 } from '@/components/Concept2';
import { Access } from '@/components/Access';
import { Footer } from '@/components/Footer';
import { KittenList } from '@/components/KittensList';
import { TabCat } from '@/components/TabCat';

export default function KittenListPage() {
  const [kittens, setKittens] = useState<KittenSelectMediaType[] | null>(null);

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
    <TabCat />
    <KittenList kittens={[]} />
    <Footer />
    </>
  );
}