import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export const Concept2 = () => {
    const [bgImage, setBgImage] = useState('/images/concept/concept-bg-decktop.jpg');

    // useEffect(() => {
    //     const handleResize = () => {
    //         const width = window.innerWidth;
    //         if (width >= 1024) {
    //             setBgImage('/images/concept/concept-bg-desktop.jpg');
    //         } else if (width >= 768) {
    //             setBgImage('/images/concept/concept-bg-tablet.jpg');
    //         } else {
    //             setBgImage('/images/concept/concept-bg-mobile.jpg');
    //         }
    //     };

    //     window.addEventListener('resize', handleResize);
    //     handleResize();

    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    return (
        <section className="text-gray-600 body-font mt-10">
            <div
                className="w-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${bgImage})`,
                }}
            >
                <div className="container px-5 py- mx-auto flex flex-col">
                    <div className="lg:w-4/6 mx-auto">
                        <div className="rounded-lg h-100 overflow-hidden">
                            <img alt="content" className="object-cover object-center h-full w-full" src="/images/concept/concept.JPG"></img>
                        </div>
                        <div className="flex flex-col sm:flex-row mt-5">
                            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                <div className="w-40 h-40 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                    <img alt="logo" className="object-cover object-center h-full w-full" src="/images/concept/Logo.JPG"></img>
                                </div>
                                <div className="flex flex-col items-center text-center justify-center">
                                    <h2 className="font-medium title-font mt-4 text-gray-900 text-xl" style={{ fontFamily: 'Paratino, serif' }}>Cat House Macaronについて</h2>
                                    <div className="w-20 h-1 bg-[#EDDFE0] rounded mt-2 mb-10"></div>
                                    <p className="text-sm" style={{ fontFamily: 'Paratino, serif' }}>
                                        一般家庭でブリードしていますいます。
                                        取り扱い猫種はマンチカン、ミヌエット、
                                        スコティッシュフォールド、
                                        ゴールデンブリティッシュです。   
                                    </p>
                                </div>
                            </div>
                            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-left sm:text-left">
                                <h2 className="font-bold text-xl sm:text-xl md:text-xl lg:text-cl text-black mb-5" style={{ fontFamily: 'Paratino, serif' }}>
                                    マカロンの意味
                                </h2>
                                <p className="leading-relaxed text-base mb-4 px-3" style={{ fontFamily: 'Paratino, serif' }}>
                                    ［特別な存在］<br />
                                    仔猫はあなたにとって特別な存在になります<br />
                                    仔猫にとっても飼い主さんは特別な存在です<br /><br />
                                </p>
                                <h2 className="font-bold text-xl sm:text-xl md:text-xl lg:text-xl text-black mb-5" style={{ fontFamily: 'Paratino, serif' }}>
                                    Concept
                                </h2>
                                <p className="leading-relaxed text-base mb-4 px-5" style={{ fontFamily: 'Paratino, serif' }}>
                                    Cat House Macaronは、命の大切さを常に意識し、顔立ちの良さと性格の良さにこだわり、愛情を込めて大切に育ててます。<br/><br/>
                                    『この子に出逢えて良かった』<br/><br/>
                                    お迎えしてくださった方々にそう思って頂けるのが望みです。
                                    仔猫に生涯の幸せを。。
                                    そしてご家族にたくさんの喜びを。。
                                </p>
                                <button type="button" className="mt-5 text-[#705C53] bg-[#EDDFE0] hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-[#EDDFE0] dark:hover:bg-gray-400 dark:focus:ring-gray-300">
                                    詳しく見る
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}