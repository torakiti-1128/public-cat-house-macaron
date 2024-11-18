import React from "react";
import preparationData from "../data/preparation.json";
import Title from "./common/Title";

{/* 親猫一覧*/}
export const Preparation: React.FC = () => {
  return (
    <section className="bg-[#FDF7F2] text-[#111111] p-8">
      <div className="container mx-auto">
        <Title text="子猫を迎える準備品" />
        {preparationData.sections.map((section, index) => (
          <div
            key={index}
            className="mb-8 bg-[#FFFFFF] rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#705C53]">
              {section.title}
            </h3>
           
              <p className="leading-relaxed mb-2 text-[#111111]">
                {section.content}
              </p>
            
          </div>
        ))}
      </div>
    </section>
  );
};
