import React from 'react';

export const Contact = () => {
    const cards = [
        {
            image: '/images/cats/cat13.JPG',
            title: '5つのお約束',
            subtitle: 'REQUIRED',
            description: '子猫をお迎えいただく方にいくつかの大切なお約束をお願いしております。お約束を守れる方のみ、子猫を譲渡させていただきます。',
            link: '/promise',
        },
        {
            image: '/images/cats/cat14.JPG',
            title: 'お取引方法',
            subtitle: 'REQUIRED',
            description: '子猫の幸せを第一に考えていますので、購入の意思がない方の見学はお断りしております。見学予約は公式LINEやお問い合わせフォームから可能です。ご確認後にご検討ください。',
            link: '/reservation',
        },
        {
            image: '/images/cats/cat12.JPG',
            title: '生体保証について',
            subtitle: 'REQUIRED',
            description: '生体保証に関する詳細情報を確認いただけます。子猫のお迎えを検討されている方には、ぜひご確認いただきたい重要な内容です。',
            link: '/guarantee',
        },
        {
            image: '/images/house/cat-house4.JPG',
            title: '猫舎紹介',
            subtitle: 'ANY',
            description: '子猫の幸せを第一に考えていますので、購入の意思がない方の見学はお断りしております。見学予約は公式LINEやお問い合わせフォームから可能です。ご確認後にご検討ください。',
            link: '/house',
        },
    ];

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-20 mx-auto">
                <h1 className="text-xl text-center subpage-title mb-12">猫舎の重要な情報</h1>
                <div className="flex flex-wrap -m-4">
                    {cards.map((card, index) => (
                        <div key={index} className="p-4 md:w-1/3">
                            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                <img className="h-60 w-full object-cover object-center" src={card.image} alt="blog" />
                                <div className="p-6">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{card.subtitle}</h2>
                                    <h1 className="title-font text-lg font-medium text-[#705C53] mb-3">{card.title}</h1>
                                    <p className="leading-relaxed mb-3">{card.description}</p>
                                    <div className="flex items-center flex-wrap">
                                        <a href={card.link} className="text-[#705C53] bg-[#FDF7F2] px-3 py-1 rounded-full shadow-lg hover:bg-[#f4e9e3] inline-flex items-center transition duration-300 ease-in-out">
                                            確認する
                                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;