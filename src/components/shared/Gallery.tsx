'use client'

import React, { useState } from 'react'
import galleryData from '../../data/gallery.json'
import Button from '../common/Button'
import Title from '../common/Title'

const Gallery: React.FC = () => {
  const [visibleImages, setVisibleImages] = useState(12)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleShowMore = () => {
    setVisibleImages((prev) => prev + 12)
  }

  const openModal = (image: string) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }
  return (
    <div className="px-5 py-20 lg:px-20 mx-auto">
      {/* タイトル */}
      <Title text="アルバム" />

      {/* ギャラリー */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {galleryData.images.slice(0, visibleImages).map((image, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              openModal(image)
            }}
            className="block overflow-hidden hover:opacity-75 transition"
          >
            <div className="relative w-full pt-[50%]">
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{
                  aspectRatio: '2 / 1',
                }}
              />
            </div>
          </a>
        ))}
      </div>
      {/* もっと見るボタン */}
      {visibleImages < galleryData.images.length && (
        <div className="text-center mt-8">
          <Button text="もっと見る" onClick={handleShowMore}></Button>
        </div>
      )}
      {/* モーダル */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-screen-lg w-full p-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-10 right-10 text-black text-4xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
