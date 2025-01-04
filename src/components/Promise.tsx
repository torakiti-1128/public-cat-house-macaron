import React from 'react'
import promiseData from '../data/promise.json'
import Title from './common/Title'

//ステップで約束を表示するコンポーネント
const PromiseStep: React.FC<{
  number: string
  title: string
  content: string
  isLast?: boolean
}> = ({ number, title, content, isLast }) => (
  <div className={`flex relative ${!isLast ? 'pb-12' : ''}`}>
    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
      {!isLast && (
        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
      )}
    </div>
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EDDFE0] inline-flex items-center justify-center text-black relative z-10">
      {number}
    </div>
    <div className="flex-grow pl-4">
      <h2 className="font-bold text-lg mb-1 text-[#705C53] tracking-wider">
        {title}
      </h2>
      <p className="leading-relaxed">{content}</p>
    </div>
  </div>
)

//5つのお約束コンポーネント
const Promise: React.FC = () => {
  return (
    <section className="text-gray-600 body-font bg-[#FDF7F2]">
      <div className="container px-10 py-12 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            <Title text={promiseData.title} />
            <p className="mb-5">{promiseData.content}</p>
            {promiseData.step.map((promise, index) => (
              <PromiseStep
                key={promise.number}
                number={promise.number}
                title={promise.title}
                content={promise.content}
                isLast={index === promiseData.step.length - 1}
              />
            ))}
          </div>
          <img
            className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
            src="/images/cats/cat17.JPG"
            alt="Promise Cats"
          />
        </div>
      </div>
    </section>
  )
}

export default Promise
