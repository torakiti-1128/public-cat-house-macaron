import React from "react";
import preparationData from "../data/preparation.json";
import Title from "./common/Title";

{/* 親猫一覧*/}
export const Preparation: React.FC = () => {
  return (
    <section className="bg-[#FDF7F2] text-[#111111] p-8">
      <div className="container mx-auto">
        <Title text="子猫を迎える準備品" />
        <div className="lg:w-2/3 mx-auto">
          <div className="flex flex-wrap w-full bg-[#EDDFE0] py-32 px-10 relative mb-8 rounded-2xl shadow-lg overflow-hidden">
            <img
              alt="gallery"
              className="w-full object-cover h-full object-center block absolute inset-0"
              src={"/images/cats/cat1.jpg"}
            />
          </div>
        </div>

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
