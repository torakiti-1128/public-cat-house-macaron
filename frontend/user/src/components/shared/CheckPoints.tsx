'use client'

import React from 'react'
import checkPointData from '@/data/checkPoints.json'
import Button from '@/components/common/Button'
import Title from '@/components/common/Title'
import Head from 'next/head'

const CheckPoints: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '確認事項',
    description:
      '子猫をお迎えいただく際の重要な情報やお約束をまとめた確認事項です。',
    itemListElement: checkPointData.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        name: item.title,
        description: item.description,
        url: `https://www.cat-house-macaron.jp${item.link}`,
        image: `https://www.cat-house-macaron.jp${item.image}`,
      },
    })),
  }

  return (
    <>
      <Head>
        <title>
          確認事項 | Cat House Macaron - 福岡県北九州の高品質ブリーダー
        </title>
        <meta
          name="description"
          content="子猫をお迎えいただく際の重要な情報やお約束をまとめた確認事項ページ。生体保証、プライバシーポリシー、準備品情報など詳細をご確認ください。"
        />
        <meta property="og:title" content="確認事項 | Cat House Macaron" />
        <meta
          property="og:description"
          content="子猫をお迎えいただく際の重要な情報やお約束をまとめた確認事項ページ。生体保証、プライバシーポリシー、準備品情報など詳細をご確認ください。"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.cat-house-macaron.jp/checkpoints"
        />
        <meta
          property="og:image"
          content="https://www.cat-house-macaron.jp/images/check-points/five-promise.JPG"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-20 mx-auto">
          <Title text="確認事項" />
          <div className="flex flex-wrap -m-4">
            {checkPointData.map((card, index) => (
              <div key={index} className="p-4 md:w-1/3 flex">
                {/* カード全体の高さを揃える */}
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col justify-between">
                  <img
                    className="h-60 w-full object-cover object-center"
                    src={card.image}
                    alt={`${card.title} - ${card.description}`}
                  />
                  <div className="p-6 flex-grow">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {card.subtitle}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-[#705C53] mb-3">
                      {card.title}
                    </h1>
                    <p className="leading-relaxed">{card.description}</p>
                  </div>
                  {/* ボタン部分をフッターに固定 */}
                  <div className="pb-6 px-6">
                    <Button
                      text="確認する"
                      link={card.link}
                      additionalClasses=""
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default CheckPoints
