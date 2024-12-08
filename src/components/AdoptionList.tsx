import React from 'react'
import { AdoptionListType } from '@/types/kitten'
import Title from './common/Title'

interface AdoptionListProps {
  adoptionList: AdoptionListType[]
}

const AdoptionList: React.FC<AdoptionListProps> = ({ adoptionList }) => {
  return (
    <section className="text-gray-600 body-font bg-[#FDF7F2]">
      <div className="container px-10 py-8 mx-auto">
        <Title text="里親募集中の猫紹介" />
        {/* 里親募集中カード */}
        <div className="flex flex-wrap -m-4">
          {adoptionList.map((cat) => (
            <div key={cat.adoptionCatId} className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={cat.url}
                  alt={cat.name}
                />
                <h3 className="tracking-widest text-pink-500 text-xs font-medium title-font mb-1">
                  {cat.breed}
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  {cat.name}
                </h2>
                <p className="leading-relaxed text-base text-gray-700 mb-4">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    性別: <span className="font-bold">{cat.sex}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    カラー: <span className="font-bold">{cat.color}</span>
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  生年月日:{' '}
                  <span className="font-bold">
                    {String(cat.birthDate).replace(
                      /(\d{4})(\d{2})(\d{2})/,
                      '$1年$2月$3日'
                    )}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdoptionList
