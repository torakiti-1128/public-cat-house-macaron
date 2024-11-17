import React from "react";
import { KittenListType } from "@/types/kitten";
import Title from "./common/Title";

interface KittenListProps {
  kittens: KittenListType[];
}

const KittenList: React.FC<KittenListProps> = ({ kittens }) => {
  return (
    <section className="text-gray-600 body-font bg-[#FDF7F2] px-10 py-8">
      <div className="container mx-auto">
        <Title text="子猫一覧" />
        <div className="flex flex-wrap -m-4">
          {kittens.map((kitten) => (
            <div key={kitten.kittenId} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <a href={"kittens/1"} className="block bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                className="w-full h-48 object-cover rounded-lg mb-6"
                src={kitten.url || "https://dummyimage.com/420x260"}
                alt={`子猫 ${kitten.kittenId}`}
                />
                <h3 className="tracking-widest text-pink-500 text-xs font-medium title-font mb-2">
                子猫番号: {kitten.kittenId}
                </h3>
                <h2 className="text-gray-900 text-lg font-medium mb-2">
                {kitten.breed}
                </h2>
                <p className="text-sm text-gray-600">
                取引状態:{kitten.tranStatus}
                <span className="font-bold">{kitten.tranStatus}</span>
                </p>
            </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KittenList;