import React from 'react'
import conceptData from '../data/concept.json'
import Button from './common/Button'

const Concept: React.FC = () => {
  return (
    <section className="text-gray-600 body-font bg-[#FDF7F2] py-10">
      <div className="container mx-auto px-5">
        <div className="relative overflow-hidden rounded-lg shadow-xl">
          <img
            alt="content"
            className="w-full max-h-150 object-contain rounded-t-lg"
            src={conceptData.image}
          />
          <div className="bg-white p-6 rounded-b-lg">
            <div className="flex flex-col sm:flex-row items-center md:items-start sm:items-start">
              {/* 左側ロゴ */}
              <div className="sm:w-1/3 lg:w-2/4 text-center sm:pr-8 sm:py-8">
                <div className="w-40 h-40 rounded-full inline-flex items-center justify-center bg-pink-200 shadow-lg">
                  <img
                    alt="logo"
                    className="object-contain rounded-full"
                    src="/images/concept/concept-logo.JPG"
                  />
                </div>
                <div className="mt-6">
                  <h2
                    className="font-bold text-2xl text-gray-800"
                    style={{ fontFamily: 'Paratino, serif' }}
                  >
                    {conceptData.about.title}
                  </h2>
                  <p
                    className="mt-4 text-lg text-gray-600 leading-relaxed"
                    style={{ fontFamily: 'Paratino, serif' }}
                  >
                    {conceptData.about.description}
                  </p>
                </div>
              </div>

              {/* 右側テキスト */}
              <div className="sm:w-2/3 sm:pl-8 mt-6 sm:mt-0 p-6 relative">
                {/* 猫の画像 */}
                <h2
                  className="font-bold text-3xl text-[#705C53] mb-6"
                  style={{ fontFamily: 'Paratino, serif' }}
                >
                  {conceptData.macaronMeaning.title}
                </h2>
                <p
                  className="text-lg text-gray-700 leading-relaxed mb-8"
                  style={{ fontFamily: 'Paratino, serif' }}
                >
                  {conceptData.macaronMeaning.content
                    .split('\n')
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </p>
                <h2
                  className="font-bold text-3xl text-[#705C53] mb-6"
                  style={{ fontFamily: 'Paratino, serif' }}
                >
                  {conceptData.concept.title}
                </h2>
                <p
                  className="text-lg text-gray-700 leading-relaxed mb-8"
                  style={{ fontFamily: 'Paratino, serif' }}
                >
                  {conceptData.concept.content
                    .split('\n')
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </p>
                <Button
                  text={conceptData.aboutButton.text}
                  link={conceptData.aboutButton.link}
                  additionalClasses="bg-[#705C53] hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-md text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Concept
