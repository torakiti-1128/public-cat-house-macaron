'use client';
import React from 'react';
import { Header } from '@/components/Layout/Heder';
import { TopPageSlideShow } from '@/components/TopPageSlideShow';
import { CheckPoints } from '@/components/Layout/CheckPoints';
import { Access } from '@/components/Layout/Access';
import { Footer } from '@/components/Layout/Footer';
import { Concept } from '@/components/Concept';

export default function Home() {
  return (
    <>
    <Header />
    <Concept />
    <TopPageSlideShow />
    <CheckPoints />
    <Access />
    <Footer />
    </>
  );
}
