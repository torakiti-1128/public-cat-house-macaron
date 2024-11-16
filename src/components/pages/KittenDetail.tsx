import React, { useState } from "react";
import { KittenDetailType } from "@/types/kitten";
import Button from "../common/Button";
import "@/styles/styles.css"; 
import Title from "../common/Title";

interface KittenDetailProps {
  kittenDetail: KittenDetailType;
  imageUrls: string[]; // 画像URLの配列
}

export const KittenDetail: React.FC<KittenDetailProps> = ({ kittenDetail, imageUrls }) => {
  const { kittenId, description, breed, color, birthDate, price } = kittenDetail;
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 現在の画像インデックス

  // 次の画像に切り替え
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  // 前の画像に切り替え
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden px-10 py-8 bg-[#FDF7F2]" style={{ fontFamily: "Paratino, serif" }}>
      <Title text="子猫の詳細" />
      <div className="container px-5 py-8 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-col lg:flex-row lg:items-stretch">
          {/* 画像セクション */} 
          <div className="w-full lg:w-1/2 relative flex items-center justify-center mb-6 lg:mb-0">
            <div className="relative w-full h-full" style={{ aspectRatio: "4/3" }}>
              <img
                alt={`Kitten Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover object-center rounded-2xl shadow"
                src={imageUrls[currentImageIndex]}
              />
              {/* スライドボタン */}
              <button
                onClick={handlePrev}
                className="custom-prev"
              >
                ← {/* 左矢印 */}
              </button>
              <button
                onClick={handleNext}
                className="custom-next"
              >
                → {/* 右矢印 */}
              </button>
            </div>
          </div>

          {/* 詳細セクション */}
          <div className="w-full lg:w-1/2 lg:pl-10 lg:py-6 flex flex-col justify-center">
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">子猫情報</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              お問い合わせ番号 {kittenId}
            </h1>
            <p className="leading-relaxed mb-4 whitespace-pre-line">{description}</p>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">猫種</span>
              <span className="ml-auto text-gray-900">{breed}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">カラー</span>
              <span className="ml-auto text-gray-900">{color}</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <span className="text-gray-500">生年月日</span>
              <span className="ml-auto text-gray-900">{birthDate}</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ¥{price.toLocaleString()}円
              </span>
              <Button
                text="お問い合わせ"
                link="/inquiry"
                additionalClasses="ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};