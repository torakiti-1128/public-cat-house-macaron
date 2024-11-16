'use client';
import React from 'react';
import { Header } from '@/components/Layout/Heder';
import { Footer } from '@/components/Layout/Footer';
import { Promise } from '@/components/Promise';

export default function PromisePage() {
  return (
    <>
    <Header />
    <Promise />
    <Footer />
    </>
  );
}
