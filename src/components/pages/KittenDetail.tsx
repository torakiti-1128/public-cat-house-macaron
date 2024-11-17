import React, { useState } from "react";
import { KittenDetailType, ParentCatKittenDetailType } from "@/types/kitten";
import Button from "../common/Button";
import "@/styles/styles.css"; 
import Title from "../common/Title";

interface KittenDetailProps {
  kittenDetail: KittenDetailType;
  imageUrls: string[]; // 子猫画像URLの配列
  parentCats: ParentCatKittenDetailType[]; // 親猫情報
  videoUrl: string; // 動画URL
}

export const KittenDetail: React.FC<KittenDetailProps> = ({ kittenDetail, imageUrls, parentCats, videoUrl }) => {
  const { kittenId, description, breed, color, birthDate, price } = kittenDetail;

  const mediaUrls = [...imageUrls, videoUrl]; // 写真と動画をまとめる
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0); // 現在のメディアインデックス

  // 次のメディアに切り替え
  const handleNext = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaUrls.length);
  };

  // 前のメディアに切り替え
  const handlePrev = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + mediaUrls.length) % mediaUrls.length);
  };

  return (
    <section 
      className="text-gray-600 body-font overflow-hidden px-10 py-8 bg-[#FDF7F2]" 
      style={{ fontFamily: "Paratino, serif" }}
    >
      <Title text="子猫の詳細" />
      <div className="container px-5 py-8 mx-auto">
        {/* 子猫詳細セクション */}
        <div className="lg:w-4/5 mx-auto flex flex-col lg:flex-row lg:items-stretch">
          {/* メディアセクション */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center mb-6 lg:mb-0">
            <div className="relative w-full h-full" style={{ aspectRatio: "4/3" }}>
              {/* メディアの切り替え */}
              {currentMediaIndex < imageUrls.length ? (
                <img
                  alt={`Kitten Image ${currentMediaIndex + 1}`}
                  className="w-full h-full object-cover object-center rounded-2xl shadow"
                  src={mediaUrls[currentMediaIndex]}
                />
              ) : (
                <video
                  className="w-full h-full object-cover object-center rounded-2xl shadow"
                  style={{ aspectRatio: "16/9" }}
                  src={mediaUrls[currentMediaIndex]}
                  controls
                />
              )}
              {/* スライドボタン */}
              <button onClick={handlePrev} className="custom-prev">
                ←
              </button>
              <button onClick={handleNext} className="custom-next">
                →
              </button>
              {/* メディア番号 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-sm px-2 py-1 rounded">
                {currentMediaIndex + 1} / {mediaUrls.length}
              </div>
            </div>
          </div>

          {/* 詳細セクション */}
          <div className="w-full lg:w-1/2 lg:pl-10 lg:py-6 flex flex-col justify-center">
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">子猫情報</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              お問い合わせ番号：{kittenId}
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
              <Button text="お問い合わせ" link="/inquiry" additionalClasses="ml-auto" />
            </div>
          </div>
        </div>

        {/* 親猫情報セクション */}
        <div className="lg:w-5/6 mx-auto mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-8">
            {parentCats.map((cat) => (
              <div key={cat.parentCatId} className="flex flex-col items-center text-center justify-center bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/2">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {cat.sex === "male" ? "パパ猫" : "ママ猫"}
                </h2>
                <img
                  className="w-24 h-24 rounded-full mb-4"
                  src={cat.url}
                  alt={`${cat.name}`}
                />
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{cat.name}</h2>
                <div className="w-20 h-1 bg-[#EDDFE0] rounded mt-2 mb-4"></div>
                <p className="text-base font-semibold text-gray-800">猫種: {cat.breed}</p>
                <p className="text-base mt-2">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};