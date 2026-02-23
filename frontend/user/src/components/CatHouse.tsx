import React from 'react'
import catHouseData from '../data/catHouse.json'
import Title from './common/Title'

//猫舎の紹介
const CatHouse: React.FC = () => {
  return (
    <div className="bg-[#FDF7F2] p-b">
      <div className="mx-auto max-w-7xl px-10">
        <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-none lg:py-8">
          <Title text="猫舎の紹介" />
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8 lg:space-y-0">
            {catHouseData.map((item, index) => (
              <div key={index} className="group relative lg:mb-8">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-3 text-base lg:mt-2">
                  <a href="#">{item.title}</a>
                </h3>
                <p className="text-base text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatHouse
