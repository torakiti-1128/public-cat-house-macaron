import React from 'react'
import aboutData from '../data/about.json'
import Title from './common/Title'
import Head from 'next/head'

const About: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: aboutData.title,
    description: aboutData.description,
    image: `https://www.cat-house-macaron.jp${aboutData.image}`,
    mainEntity: aboutData.sections.map((section) => ({
      '@type': 'Thing',
      name: section.title,
      description: section.content,
    })),
  }

  return (
    <>
      <Head>
        <title>{aboutData.title}</title>
        <meta name="description" content={aboutData.description} />
        <meta property="og:title" content={aboutData.title} />
        <meta property="og:description" content={aboutData.description} />
        <meta
          property="og:image"
          content={`https://www.cat-house-macaron.jp${aboutData.image}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.cat-house-macaron.jp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={aboutData.title} />
        <meta name="twitter:description" content={aboutData.description} />
        <meta
          name="twitter:image"
          content={`https://www.cat-house-macaron.jp${aboutData.image}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <section className="bg-[#FDF7F2] text-[#111111] p-8">
        <div className="container mx-auto">
          <Title text={aboutData.title} />
          <div className="mx-auto">
            <div className="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4">
              <img
                alt="Cat House Macaron gallery"
                className="w-full object-cover h-full object-center block absolute inset-0 rounded-xl shadow-lg"
                src={aboutData.image}
              />
            </div>
          </div>
          <div className="mx-auto space-y-8">
            {aboutData.sections.map((section, index) => (
              <div key={index} className="bg-[#FFFFFF] rounded-lg shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#705C53]">
                    {section.title}
                  </h3>
                  <p className="pt-4 leading-relaxed">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default About
