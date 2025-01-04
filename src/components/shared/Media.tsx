'use client'

import React from 'react'
import mediaData from '../../data/media.json'
import Title from '../common/Title'

const Media: React.FC = () => {
  return (
    <section className="text-gray-600 body-font bg-[#FDF7F2] mt-10">
      <div className="container px-5 py-20 mx-auto">
        <Title text="SNSの紹介" />
        <div className="flex flex-wrap -m-4">
          {mediaData.map((media, index) => (
            <div
              key={index}
              className="p-4 w-1/2 sm:w-1/2 lg:w-1/4" // スマホ: 2列, デスクトップ: 4列
            >
              <div className="h-full bg-white p-6 rounded-lg shadow-lg text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  className="mb-4 mx-auto"
                >
                  <path d={media.iconPath}></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900">
                  {media.title}
                </h3>
                <p className="text-gray-600">{media.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Media
