import React, { useState } from 'react'
import {
  KittenDetailType,
  MediaDTO,
  ParentCatKittenDetailType,
} from '@/types/kitten'
import Button from '@/components/common/Button'
import Title from '@/components/common/Title'
import { formatDateToJapanese } from '@/hooks/datetimeConverter'

interface KittenDetailProps {
  kittenDetail: KittenDetailType // 子猫の詳細情報
  imageUrls: MediaDTO[] // 子猫画像URL：基本的には4枚
  parentCats: ParentCatKittenDetailType[] // 親猫の情報
  videoUrls: MediaDTO[] // 動画URL
}

const KittenDetail: React.FC<KittenDetailProps> = ({
  kittenDetail,
  imageUrls,
  parentCats,
  videoUrls,
}) => {
  const {
    kittenId,
    description,
    breed,
    color,
    sex,
    birthDate,
    tranState,
    price,
  } = kittenDetail

  const mediaUrls = [
    ...(imageUrls?.map((image) => image.url) || []),
    ...(videoUrls?.map((video) => video.url) || []),
  ]
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false) // ボタン制御用

  // メディア切り替え
  const handleNext = () => {
    if (isTransitioning) return // すでに遷移中の場合は無視

    setIsTransitioning(true)
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaUrls.length)

    // 切り替え完了後に解除
    setTimeout(() => setIsTransitioning(false), 500) // 300ms は切り替えアニメーションの時間
  }

  const handlePrev = () => {
    if (isTransitioning) return // すでに遷移中の場合は無視

    setIsTransitioning(true)
    setCurrentMediaIndex(
      (prevIndex) => (prevIndex - 1 + mediaUrls.length) % mediaUrls.length
    )

    // 切り替え完了後に解除
    setTimeout(() => setIsTransitioning(false), 500)
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden bg-[#FDF7F2]">
      <div className="container px-5 py-8 mx-auto">
        <Title text="子猫の詳細" />
        {/* 子猫詳細セクション */}
        <div className="mx-auto flex flex-col lg:flex-row lg:items-stretch">
          {/* メディアセクション */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center mb-6 lg:mb-0">
            <div
              className="relative w-full h-full"
              style={{ aspectRatio: '4/3' }}
            >
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
                  style={{ aspectRatio: '16/9' }}
                  src={mediaUrls[currentMediaIndex]}
                  controls
                />
              )}
              {/* スライドボタン */}
              <button
                onClick={handlePrev}
                className="custom-prev"
                disabled={isTransitioning}
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="custom-next"
                disabled={isTransitioning}
              >
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
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">
              子猫情報
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              子猫番号：{kittenId}
            </h1>
            <p className="leading-relaxed mb-4 whitespace-pre-line">
              {description}
            </p>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">猫種</span>
              <span className="ml-auto text-gray-900">{breed}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">カラー</span>
              <span className="ml-auto text-gray-900">{color}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">性別</span>
              <span className="ml-auto text-gray-900">
                {sex == 0 ? '男の子' : '女の子'}
              </span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">生年月日</span>
              <span className="ml-auto text-gray-900">
                {formatDateToJapanese(birthDate)}
              </span>
            </div>
            <div className="flex border-t border-b border-gray-200 py-2">
              <span className="text-gray-500">取引状況</span>
              <span className="ml-auto text-gray-900">{tranState}</span>
            </div>
            <div className="flex mt-5 mb-6 border-gray-200 py-2">
              <span className="text-2xl text-gray-900">生体価格：</span>
              <p className="ml-auto text-2xl text-gray-900">
                ¥{price.toLocaleString()}円
              </p>
            </div>
            {tranState == '商談中' && (
              <div className="flex mb-6">
                <p className="ml-auto text-sm text-red-500">
                  ※この子猫は現在商談中です。最新の情報ではない場合がありますので、希望される方はお問い合わせください。
                </p>
              </div>
            )}
            <div>
              {tranState == '譲渡済' ? (
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-blue-500">
                    ご家族決まりました！
                  </span>
                </div>
              ) : (
                <div className="flex w-full max-w-full justify-center items-center gap-4">
                  <Button
                    text="お問い合わせ"
                    link="/inquiry"
                    additionalClasses="w-1/2 py-2"
                  />
                  <Button
                    text="ご見学を希望"
                    link="/inspection/"
                    id={kittenId.toString()}
                    additionalClasses="w-1/2 py-2"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 親猫情報セクション */}
        <div className="mx-auto mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-8">
            {parentCats.map((cat) => (
              <div
                key={cat.parentCatId}
                className="flex flex-col items-center text-center justify-center bg-white p-6 rounded-3xl shadow-lg w-full lg:w-1/2"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {cat.sex == 0 ? 'パパ' : 'ママ'}
                </h2>
                <img
                  className="w-24 h-24 rounded-xl mb-4"
                  src={cat.imageUrl}
                  alt={`${cat.name}`}
                />
                <h2 className="font-medium title-font font-semibold mt-4 text-gray-900 text-lg">
                  {cat.name}
                </h2>
                <div className="w-20 h-1 bg-[#EDDFE0] rounded mt-2 mb-4"></div>
                <p className="text-base text-gray-800">{cat.breed}</p>
                <p className="text-base mt-2">年齢：{cat.age}歳</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default KittenDetail
