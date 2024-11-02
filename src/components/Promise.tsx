import React from "react";

export const Promise: React.FC = () => {
    return (
        <section className="text-gray-600 body-font bg-[#FDF7F2]">
            <div className="container px-5 py-12 mx-auto flex flex-wrap">
                {/* Steps Section */}
                <div className="flex flex-wrap w-full">
                    <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                        <h2 className="text-2xl font-bold mb-6 text-center text-[#705C53] subpage-title">5つのお約束</h2>
                        <p className="mb-8 text-gray-700">
                            大切な命です。以下のお約束をお守り頂ける方のみ譲渡いたします。
                        </p>

                        {/* Promise 1 */}
                        <div className="flex relative pb-12">
                            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EDDFE0] inline-flex items-center justify-center text-black relative z-10">
                                1
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">ペットとしての販売</h2>
                                <p className="leading-relaxed">
                                    子猫はペットとしての販売となります。お迎え後に避妊・去勢手術をお願いいたします。また、完全室内飼いをお願いいたします。
                                </p>
                            </div>
                        </div>

                        {/* Promise 2 */}
                        <div className="flex relative pb-12">
                            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EDDFE0] inline-flex items-center justify-center text-black relative z-10">
                                2
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">良質なフードの提供</h2>
                                <p className="leading-relaxed">
                                    子猫に与えるフードは、総合栄養表示のある良質なフードにしてください。病気の予防になります。
                                </p>
                            </div>
                        </div>

                        {/* Promise 3 */}
                        <div className="flex relative pb-12">
                            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EDDFE0] inline-flex items-center justify-center text-black relative z-10">
                                3
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">定期的な予防接種</h2>
                                <p className="leading-relaxed">
                                    子猫には定期的に予防接種を受けさせてください。混合ワクチンは、初年度は最低2回、1歳以降は最低年1回の接種をお願いいたします。
                                </p>
                            </div>
                        </div>

                        {/* Promise 4 */}
                        <div className="flex relative pb-12">
                            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EDDFE0] inline-flex items-center justify-center text-black relative z-10">
                                4
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">病気や怪我の際は動物病院へ</h2>
                                <p className="leading-relaxed">
                                    猫も人間と一緒です。病気や怪我の場合、すぐに動物病院にお連れください。
                                </p>
                            </div>
                        </div>

                        {/* Promise 5 */}
                        <div className="flex relative">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EDDFE0] inline-flex items-center justify-center text-black relative z-10">
                                5
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">終生育養をお願いします</h2>
                                <p className="leading-relaxed">
                                    猫の寿命は10〜18年です。最後の旅立ちのときまでたくさんの愛情をお願いいたします。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <img className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12" src="/images/two-cat.JPG" alt="Promise Cats" />
                </div>
            </div>
        </section>
    );
};