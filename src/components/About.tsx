import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export const About: React.FC = () => {
    const [isOpen, setIsOpen] = useState([false, false, false, false, false, false]);

    const toggleSection = (index: number) => {
        const newState = [...isOpen];
        newState[index] = !newState[index];
        setIsOpen(newState);
    };

    return (
        <section className="bg-[#FDF7F2] text-[#111111] p-8">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#705C53] subpage-title">Cat House Macaronについて</h2>
                <div className="lg:w-2/3 mx-auto">
                    <div className="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4">
                        <img
                            alt="gallery"
                            className="w-full object-cover h-full object-center block absolute inset-0 rounded-xl shadow-lg"
                            src="/images/two-cat.JPG"
                        />
                    </div>
                </div>
                <div className="lg:w-3/4 mx-auto space-y-8">
                    {[
                        { title: "1. こだわり", content: "Cat House Macaronは、海外血統が入った親猫や海外から輸入した親猫を用いて、唯一無二の子猫を生み出すことを目指しています。カラーや柄も遺伝子の組み合わせを考慮して作り上げています。" },
                        { title: "2. 猫の生活スタイル", content: "親猫や子猫はケージではなく、自由にのびのびと生活し、私たちの家族の一員として大切にされています。" },
                        { title: "3. 安全なブリード", content: "短足×短足や折れ耳×折れ耳などの危険な繁殖は行わず、遺伝子検査や健康診断を定期的に実施しています。母猫に負担がかからないよう、ブリーディングスケジュールもきちんと管理しています。" },
                        { title: "4. お母さん兄弟と一緒", content: "子猫は、お母さんと兄弟と一緒に過ごすことで社会性を身につけ、安心して成長します。" },
                        { title: "5. 穏やかで甘えん坊な性格", content: "環境に応じて猫の性格は変わります。毎日のスキンシップで、穏やかで甘えん坊な性格を育んでいます。" },
                        { title: "6. アフターフォロー", content: "飼い主様と猫ちゃんの幸せのため、いつでもご相談を受け付けています。不安や疑問はお気軽にご連絡ください。" },
                    ].map((section, index) => (
                        <div key={index} className="bg-[#FFFFFF] rounded-lg shadow-lg">
                            <div className="flex items-center justify-between p-6">
                                <h3 className="text-xl font-semibold text-[#705C53]">{section.title}</h3>
                                <button
                                    onClick={() => toggleSection(index)}
                                    className="text-[#705C53] focus:outline-none"
                                >
                                    {isOpen[index] ? <FaMinus /> : <FaPlus />}
                                </button>
                            </div>
                            {isOpen[index] && (
                                <div className="p-6 pt-0 leading-relaxed">
                                    <p>{section.content}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};