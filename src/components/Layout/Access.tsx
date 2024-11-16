import React from 'react';
import accessData from '../../data/access.json';

//地図やお店情報
export const Access: React.FC = () => {
  return (
    <section className="text-gray-600 body-font relative bg-[#FDF7F2] py-16">
      <div className="container px-5 mx-auto flex flex-col lg:flex-row sm:flex-nowrap sm:space-x-8">
        {/* 地図 */}
        <div className="lg:w-2/3 md:w-1/2 bg-[#EDDFE0] rounded-3xl overflow-hidden p-10 flex items-end justify-start relative shadow-lg mb-8 lg:mb-0">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0 rounded-lg"
            title="map"
            src={accessData.mapUrl}
          ></iframe>
          <div className="bg-white bg-opacity-90 relative flex flex-wrap py-6 px-8 rounded-xl shadow-md border border-[#F3E8E8]">
            <div className="lg:w-1/2 px-4">
              <h2 className="title-font font-bold text-[#705C53] tracking-widest text-sm">{accessData.address.title}</h2>
              <p className="mt-2 text-[#4A403A] whitespace-pre-line">{accessData.address.details}</p>
            </div>
            <div className="lg:w-1/2 px-4 mt-4 lg:mt-0">
              <h2 className="title-font font-bold text-[#705C53] tracking-widest text-sm">{accessData.distance.title}</h2>
              <p className="leading-relaxed text-[#4A403A] mt-2">{accessData.distance.details}</p>
              <h2 className="title-font font-bold text-[#705C53] tracking-widest text-sm mt-6">{accessData.other.title}</h2>
              <p className="leading-relaxed text-[#4A403A] mt-2">{accessData.other.details}</p>
            </div>
          </div>
        </div>

        {/* お店情報 */}
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center items-start border border-[#F3E8E8]">
          <h3 className="text-lg font-bold text-[#705C53] mb-4">{accessData.shopInfo.title}</h3>
          {accessData.shopInfo.details.map((info, index) => (
            <p key={index} className="text-[#4A403A] mb-4 last:mb-0">{info}</p>
          ))}
        </div>
      </div>
    </section>
  );
};