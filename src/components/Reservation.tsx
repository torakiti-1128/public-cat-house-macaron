import React from "react";

export const Reservation: React.FC = () => {
    return (
        <section className="bg-[#FDF7F2] text-[##705C53] p-8">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8 text-[#705C53] subpage-title">お取引方法</h2>
                
                {/* 画像と内容のレスポンシブグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {/* ご予約情報 */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold mb-4 text-[#705C53]">ご予約について</h3>
                        <p className="leading-relaxed mb-4">
                            ご家族皆さまでご検討いただき、ご購入の意思が固まりましたらご連絡ください。ご予約金として生体価格の50％を指定口座に入金ください。入金確認ができましたら正式なご予約とさせていただき、他の方へのご案内を中止させていただきます。
                        </p>
                        <p className="text-sm text-[#B7B7B7] leading-relaxed">
                            ※ご予約後、お客様都合によるキャンセルの場合、ご予約金のご返金はいたしかねます。
                        </p>
                    </div>

                    {/* お支払い方法 */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold mb-4 text-[#705C53]">お支払い方法</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>クレジットカード（準備中）</li>
                            <li>PayPay（準備中）</li>
                            <li>銀行振込</li>
                            <li>現金</li>
                        </ul>
                    </div>

                    {/* お迎えについて */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold mb-4 text-[#705C53]">お迎えについて</h3>
                        <p className="leading-relaxed mb-4">
                            Cat House Macaronでは生後60日以降かつ体重800g以上のお引き渡しとしています。双方のスケジュールが良い日をお渡し日といたします。
                        </p>
                        <p className="text-sm text-[#B7B7B7] leading-relaxed">
                            ※キャリーケースをお持ちの上、当猫舎までお迎えください。全国対応の委託販売もご相談可能です。
                        </p>
                    </div>

                    {/* ワクチン・マイクロチップについて */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold mb-4 text-[#705C53]">ワクチン・マイクロチップについて</h3>
                        <p className="leading-relaxed mb-4">
                            生後60日頃に3種混合ワクチンを接種し、ご予約後にマイクロチップを装着いたします。ワクチン代5,000円、マイクロチップ代8,000円を頂戴します。
                        </p>
                    </div>

                    {/* 血統書について */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold mb-4 text-[#705C53]">血統書について</h3>
                        <p className="leading-relaxed mb-4">
                            生後6ヶ月以降、避妊・去勢手術後に手術明細書をご提示いただきましたら国内血統書を郵送いたします。血統書代5,000円を頂戴します。
                        </p>
                        <p className="text-sm text-[#B7B7B7] leading-relaxed">
                            ※血統書の子猫の名前は飼い主様が決めた名前をお入れします。名前が決まりましたらお知らせください。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};