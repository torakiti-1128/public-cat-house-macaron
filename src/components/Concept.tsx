import React from 'react'
import conceptData from '../data/concept.json'
import Button from './common/Button'

const Concept: React.FC = () => {
  return (
    <div>
      <div className="relative overflow-hidden">
        <img
          alt="content"
          className="w-full max-h-150 object-contain"
          src={conceptData.image}
        />
      </div>
      <section className="text-gray-800 body-font bg-[#FAF7F5] py-16">
        <div className="container mx-auto px-8 lg:px-10">
          <div className="p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              {/* 左側: Aboutタイトルと説明 */}
              <div className="sm:w-1/2 lg:w-2/5 text-left sm:pr-8 mb-8 sm:mb-0">
                <h2
                  className="font-bold text-4xl text-[#705C53] mb-6"
                  style={{ fontFamily: 'Paratino, serif' }}
                >
                  <span className="inline-block mr-2 text-pink-400">🐾</span>
                  About
                </h2>
                <p
                  className="text-xl text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Paratino, serif' }}
                >
                  {conceptData.about.description
                    .split('\n')
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </p>
              </div>

              {/* 右側: 内容部分 */}
              <div className="sm:w-1/2 lg:w-3/5 sm:pl-8">
                <div className="mb-8">
                  <h2
                    className="font-semibold text-3xl text-[#705C53] mb-4"
                    style={{ fontFamily: 'Paratino, serif' }}
                  >
                    {conceptData.macaronMeaning.title}
                  </h2>
                  <p
                    className="text-lg text-gray-700 leading-relaxed"
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
                </div>
                <div className="mb-8">
                  <h2
                    className="font-semibold text-3xl text-[#705C53] mb-4"
                    style={{ fontFamily: 'Paratino, serif' }}
                  >
                    {conceptData.concept.title}
                  </h2>
                  <p
                    className="text-lg text-gray-700 leading-relaxed"
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
                </div>
                <div className="text-center sm:text-left">
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
    </div>
  )
}

export default Concept
