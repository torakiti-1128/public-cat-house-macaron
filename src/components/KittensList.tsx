import { KittenSelectMediaType } from "@/types/kitten";
import React from "react";

interface KittenItemProps {
    kittens: KittenSelectMediaType[];
}

export const KittenList: React.FC<KittenItemProps> = ({ kittens }) => {
    return (
        <section className="text-gray-600 body-font bg-[#FDF7F2]">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {kittens.map((kitten) => (
                        <div key={kitten.kittenId} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img 
                                    alt={kitten.species} 
                                    className="object-cover object-center w-full h-full block" 
                                    src={kitten.url || "https://dummyimage.com/420x260"} 
                                />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">子猫番号：{kitten.kittenId}</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">{kitten.species}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};