'use client';
import React, { useEffect, useState } from 'react';
import { fetchAllRecruitingKittensWithMedia } from "@/api/kitten/select";
import { KittenSelectMediaType } from '@/types/kitten';
import { Header } from '@/components/Heder';
import TopPageSlideShow from '@/components/TopPageSlideShow';
import { Contact } from '@/components/Contact';
import { Access } from '@/components/Access';
import { Footer } from '@/components/Footer';
import { Instagram } from '@/components/Instagram';
import { Concept } from '@/components/Concept';

export default function Home() {
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
    <Concept />
    <TopPageSlideShow />
    <Contact />
    <Access />
    <Footer />
    </>
  );
}
