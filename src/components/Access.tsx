export const Access = () => {
    return (
        <section className="text-gray-600 body-font relative bg-[#FDF7F2] py-16">
            <div className="container px-5 mx-auto flex flex-col lg:flex-row sm:flex-nowrap sm:space-x-8">
                {/* 地図のカード */}
                <div className="lg:w-2/3 md:w-1/2 bg-[#EDDFE0] rounded-3xl overflow-hidden p-10 flex items-end justify-start relative shadow-lg mb-8 lg:mb-0">
                    <iframe
                        width="100%"
                        height="100%"
                        className="absolute inset-0 rounded-lg"
                        title="map"
                        src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=ja&amp;q=福岡県北九州市八幡西区岸の浦2-4-52&amp;ie=UTF8&amp;t=&amp;z=17&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                    <div className="bg-white bg-opacity-90 relative flex flex-wrap py-6 px-8 rounded-xl shadow-md border border-[#F3E8E8]">
                        <div className="lg:w-1/2 px-4">
                            <h2 className="title-font font-bold text-[#705C53] tracking-widest text-sm">住所</h2>
                            <p className="mt-2 text-[#4A403A]">
                                〒806-0034<br />
                                福岡県 北九州市 八幡西区 岸の浦2-4-52
                            </p>
                        </div>
                        <div className="lg:w-1/2 px-4 mt-4 lg:mt-0">
                            <h2 className="title-font font-bold text-[#705C53] tracking-widest text-sm">距離</h2>
                            <p className="leading-relaxed text-[#4A403A] mt-2">黒崎駅から徒歩15分</p>
                            <h2 className="title-font font-bold text-[#705C53] tracking-widest text-sm mt-6">その他</h2>
                            <p className="leading-relaxed text-[#4A403A] mt-2">駐車場あります。</p>
                        </div>
                    </div>
                </div>

                {/* その他のカード */}
                <div className="lg:w-1/3 md:w-1/2 bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center items-start border border-[#F3E8E8]">
                    <h3 className="text-lg font-bold text-[#705C53] mb-4">店舗情報</h3>
                    <p className="text-[#4A403A] mb-4">営業時間: 10:00 - 18:00</p>
                    <p className="text-[#4A403A]">【第一種動物取扱業登録】第24024</p>
                    <p className="text-[#4A403A]">【動物取扱業責任者】高橋真澄</p>
                    <p className="text-[#4A403A]">【登録年月】2024年10月10日</p>
                    <p className="text-[#4A403A]">【有効期限の末日】2029年10月09日</p>
                </div>
            </div>
        </section>
    );
};