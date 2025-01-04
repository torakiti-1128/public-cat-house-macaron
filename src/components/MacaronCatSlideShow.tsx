'use client'

import React from 'react'
import macaronData from '../data/macaron.json'

export const MacaronCatSlideShow: React.FC = () => {
  const { images, animationDuration } = macaronData

  return (
    <div className="relative overflow-hidden mt-10 w-full h-[300px]">
      <div
        className="flex w-full h-full animate-slide"
        style={{
          animationDuration: `${animationDuration}s`,
        }}
      >
        {/* 繰り返す画像リスト */}
        {[...images, ...images].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Macaron Cat ${index + 1}`}
            className="flex-shrink-0 mx-12 object-contain"
            style={{
              // PC時に画像サイズを制限するためのスタイル
              width: `${100 / images.length}%`, // デフォルトの幅
              height: '100%', // デフォルトの高さ
              maxWidth: '${100 / images.length}%', // 最大幅を700pxに制限 (PC向け)
              maxHeight: '300px', // 最大高さを500pxに制限 (PC向け)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default MacaronCatSlideShow
