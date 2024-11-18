import React from "react";
import guaranteeData from "../data/guarantee.json";
import Title from "./common/Title";

export const Guarantee: React.FC = () => {
  return (
    <section className="bg-[#FDF7F2] text-[#111111] p-8">
      <div className="container mx-auto">
        <Title text={guaranteeData.title} />
        {guaranteeData.sections.map((section, index) => (
          <div
            key={index}
            className="mb-8 bg-[#FFFFFF] rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#705C53]">
              {section.title}
            </h3>
            {section.list ? (
              <ul className="list-disc pl-6 space-y-1 text-[#111111]">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="leading-relaxed mb-2 text-[#111111]">
                {section.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};