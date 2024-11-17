'use client';
import React from 'react';
import { Header } from '@/components/Layout/Heder';
import { Footer } from '@/components/Layout/Footer';
import AdoptionList from '@/components/AdoptionList';
import { AdoptionListType } from '@/types/kitten';

const testAdoptionList: AdoptionListType[] = [
  {
      adoptionCatId: 1,
      name: "キング",
      sex: "オス",
      birthDate: 20190515,
      breed: "スコティッシュフォールド",
      color: "ブルータビー",
      description: "優雅な見た目と落ち着いた性格を持つ頼もしい父猫です。",
      url: "/images/Cats/cat1.jpg",
  },
  {
      adoptionCatId: 2,
      name: "クイーン",
      sex: "メス",
      birthDate: 20200610,
      breed: "スコティッシュフォールド",
      color: "ホワイト",
      description: "人懐っこい性格で子猫たちに愛情を注ぐ優しい母猫です。",
      url: "/images/Cats/cat2.jpg",
  },
  {
      adoptionCatId: 3,
      name: "シャルル",
      sex: "オス",
      birthDate: 20180401,
      breed: "マンチカン",
      color: "シルバータビー",
      description: "短い足が特徴的で、人懐っこく遊び好きな父猫です。",
      url: "/images/Cats/cat3.jpg",
  },
  {
      adoptionCatId: 4,
      name: "レディ",
      sex: "メス",
      birthDate: 20191120,
      breed: "マンチカン",
      color: "クリーム",
      description: "穏やかな性格で子猫たちに寄り添う優しい母猫です。",
      url: "/images/Cats/cat4.jpg",
  },
  {
      adoptionCatId: 5,
      name: "バロン",
      sex: "オス",
      birthDate: 20170312,
      breed: "ブリティッシュショートヘア",
      color: "ブルー",
      description: "堂々とした見た目で、健康的で元気な父猫です。",
      url: "/images/Cats/cat5.jpg",
  },
  {
      adoptionCatId: 6,
      name: "ベル",
      sex: "メス",
      birthDate: 20201030,
      breed: "ブリティッシュショートヘア",
      color: "ブルー&ホワイト",
      description: "美しい毛並みと優雅な動きが魅力の母猫です。",
      url: "/images/Cats/cat6.jpg",
  },
  {
      adoptionCatId: 7,
      name: "レオ",
      sex: "オス",
      birthDate: 20180115,
      breed: "ラグドール",
      color: "シールポイント",
      description: "穏やかで優しい性格で、抱っこが大好きな父猫です。",
      url: "/images/Cats/cat7.jpg",
  },
  {
      adoptionCatId: 8,
      name: "ミミ",
      sex: "メス",
      birthDate: 20191130,
      breed: "ラグドール",
      color: "ブルーポイント",
      description: "ふんわりとした毛並みが自慢で甘えん坊な母猫です。",
      url: "/images/Cats/cat8.jpg",
  },
  {
      adoptionCatId: 9,
      name: "タイガー",
      sex: "オス",
      birthDate: 20170125,
      breed: "ベンガル",
      color: "スノーベンガル",
      description: "野性味あふれる見た目で、活発な性格が特徴の父猫です。",
      url: "/images/Cats/cat9.jpg",
  },
  {
      adoptionCatId: 10,
      name: "サクラ",
      sex: "メス",
      birthDate: 20210510,
      breed: "ベンガル",
      color: "ブラウン",
      description: "元気いっぱいで遊び好きな、華やかな柄の母猫です。",
      url: "/images/Cats/cat10.jpg",
  },
];

export default function AdoptionPages() {
  return (
    <>
    <Header />
    <AdoptionList adoptionList={testAdoptionList}/>
    <Footer />
    </>
  );
}
