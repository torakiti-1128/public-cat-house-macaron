'use client'

import React from 'react'
import accessData from '../../data/access.json'
import Head from 'next/head'

const Access: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cat House Macaron',
    description:
      '福岡県北九州市八幡西区にある高品質な猫のブリーダー。マンチカンやスコティッシュフォールドなどを取り扱い。',
    image: 'https://www.cat-house-macaron.jp/images/two-cat.JPG',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '岸の浦2-4-52',
      addressLocality: '八幡西区',
      addressRegion: '福岡県',
      postalCode: '806-0034',
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '33.8704',
      longitude: '130.7689',
    },
    url: 'https://www.cat-house-macaron.jp',
    telephone: '070-7570-9493',
    openingHours: 'Mo-Su 10:00-18:00',
    priceRange: '価格帯を記載',
    hasMap:
      'https://www.google.com/maps/place/福岡県北九州市八幡西区岸の浦2-4-52',
  }

  return (
    <>
      <Head>
        <title>
          アクセス | Cat House Macaron - 福岡県北九州の高品質ブリーダー
        </title>
        <meta
          name="description"
          content="福岡県北九州市の高品質猫専門ブリーダーCat House Macaronの店舗情報。黒崎駅から徒歩15分、駐車場完備。"
        />
        <meta property="og:title" content="アクセス | Cat House Macaron" />
        <meta
          property="og:description"
          content="福岡県北九州市の高品質猫専門ブリーダーCat House Macaronの店舗情報。黒崎駅から徒歩15分、駐車場完備。"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.cat-house-macaron.jp/access"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <section className="text-gray-600 body-font relative bg-[#FDF7F2] py-16">
        <div className="container px-5 mx-auto flex flex-col lg:flex-row md:flex-row sm:flex-nowrap sm:space-x-8">
          {/* 地図のカード */}
          <div className="lg:w-2/3 md:w-1/2 bg-[#EDDFE0] rounded-3xl overflow-hidden p-10 flex items-end justify-start relative shadow-lg mb-2">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0 rounded-lg"
              title="map"
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=ja&amp;q=福岡県北九州市八幡西区岸の浦2-4-52&amp;ie=UTF8&amp;t=&amp;z=17&amp;iwloc=B&amp;output=embed"
              allowFullScreen
              aria-label="Cat House Macaron所在地"
            ></iframe>
            <div className="bg-white bg-opacity-90 relative flex flex-wrap py-6 px-8 rounded-xl shadow-md border border-[#F3E8E8]">
              <div className="lg:w-1/2 px-4">
                <h2 className="title-font font-bold text-[#705C53] tracking-widest text-sm">
                  {accessData.address.title}
                </h2>
                <p className="mt-2 text-[#4A403A] whitespace-pre-line">
                  {accessData.address.details}
                </p>
              </div>
              <div className="lg:w-1/2 px-4 mt-4 lg:mt-0">
                <h2 className="title-font font-bold text-[#705C53] tracking-widest text-sm">
                  {accessData.distance.title}
                </h2>
                <p className="leading-relaxed text-[#4A403A] mt-2">
                  {accessData.distance.details}
                </p>
                <h2 className="title-font font-bold text-[#705C53] tracking-widest text-sm mt-6">
                  {accessData.other.title}
                </h2>
                <p className="leading-relaxed text-[#4A403A] mt-2">
                  {accessData.other.details}
                </p>
              </div>
            </div>
          </div>

          {/* その他のカード */}
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center items-start border border-[#F3E8E8]">
            <h3 className="text-lg font-bold text-[#705C53] mb-4">
              {accessData.shopInfo.title}
            </h3>
            {accessData.shopInfo.details.map((info, index) => (
              <p key={index} className="text-[#4A403A] mb-4 last:mb-0">
                {info}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Access
