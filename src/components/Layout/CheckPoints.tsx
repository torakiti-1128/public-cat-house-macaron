import React from 'react'
import checkPointData from '@/data/checkPoints.json'
import Button from '@/components/common/Button'
import Title from '@/components/common/Title'

const CheckPoints: React.FC = () => {
  return (
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
                  alt={card.title}
                />
                <div className="p-6 flex-grow">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {card.subtitle}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-[#705C53] mb-3">
                    {card.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{card.description}</p>
                </div>
                {/* ボタン部分をフッターに固定 */}
                <div className="p-6">
                  <Button
                    text="確認する"
                    link={card.link}
                    additionalClasses=""
                    icon={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CheckPoints
