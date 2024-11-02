import React from 'react';

const CatHouse = () => {
  const collections = [
    {
      image: '/images/house/cat-house4.jpg',
      title: 'ベビールーム1',
      description: '太陽が差し込むアウトドアにも優しいデザインで、子猫たちが自然光を楽しめる空間です。',
    },
    {
      image: '/images/house/cat-house5.jpg',
      title: 'ベビールーム2',
      description: '暖かく広々としたインテリアが特徴で、子猫たちが安心して過ごせるお部屋です。',
    },
    {
      image: '/images/house/cat-house1.jpg',
      title: '男の子部屋',
      description: '男の子用に設計された、全ての猫が快適に過ごせる居心地の良いスペースです。',
    },
    {
      image: '/images/house/cat-house2.jpg',
      title: '女の子部屋',
      description: '多頭飼いにも最適な広さで、女の子たちがリラックスして遊べる空間です。',
    },
    {
      image: '/images/house/cat-house3.jpg',
      title: 'お産室',
      description: '安心して出産できるようカーテンで囲われたプライバシーを保てるお部屋です。',
    },
  ];

  return (
    <div className="bg-[#FDF7F2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
        <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:max-w-none lg:py-32">
          <h2 className="text-xl text-center font-bold subpage-title">猫舎の紹介</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
            {collections.map((item, index) => (
              <div key={index} className="group relative lg:mb-8">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-3 text-base lg:mt-2">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    {item.title}
                  </a>
                </h3>
                <p className="text-base text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatHouse;