'use client'

import React from 'react'
import macaronData from '../data/macaron.json'

export const MacaronCatSlideShow: React.FC = () => {
  const { images } = macaronData

  return (
    <div className="relative overflow-hidden w-full mt-10 h-[300px]">
      <div className="slide-track">
        {/* 画像リストを2倍にして無限ループを実現 */}
        {[...images, ...images].map((image, index) => (
          <div className="slide" key={index}>
            <img
              src={image}
              alt={`Macaron Cat ${index + 1}`}
              className="object-contain"
              style={{
                maxWidth: '400px',
                maxHeight: '300px',
              }}
            />
          </div>
        ))}
      </div>

      {/* CSSスタイル */}
      <style jsx>{`
        .slide-track {
          display: flex;
          animation: scroll 60s linear infinite;
          width: calc(400px * ${images.length * 2});
        }

        .slide {
          flex: 0 0 auto; /* 各画像が均等に表示されるように */
          width: 400px;
          margin-right: 10px; /* 画像間のスペース */
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-400px * ${images.length}));
          }
        }
      `}</style>
    </div>
  )
}

export default MacaronCatSlideShow
