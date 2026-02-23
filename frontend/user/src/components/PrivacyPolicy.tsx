import React from 'react'
import privacyPolicyData from '../data/privacyPolicy.json'
import Title from './common/Title'

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="bg-[#FDF7F2] text-[#111111] p-8">
      <div className="container mx-auto">
        <Title text={privacyPolicyData.title} />
        <div className="mx-auto">
          <div className="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4">
            <img
              alt="gallery"
              className="w-full object-cover h-full object-center block absolute inset-0 rounded-xl shadow-lg"
              src={privacyPolicyData.image}
            />
          </div>
        </div>
        <div className="mx-auto space-y-8">
          {privacyPolicyData.sections.map((section, index) => (
            <div key={index} className="bg-[#FFFFFF] rounded-lg shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#705C53]">
                  {section.title}
                </h3>
                <p className="pt-4 leading-relaxed">
                  {section.content.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy
