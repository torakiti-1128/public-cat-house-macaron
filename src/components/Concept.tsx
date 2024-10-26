import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export const Concept = () => {
    const [bgImage, setBgImage] = useState('/images/concept/concept-bg-decktop.jpg');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1024) {
                setBgImage('/images/concept/concept-bg-desktop.jpg');
            } else if (width >= 768) {
                setBgImage('/images/concept/concept-bg-tablet.jpg');
            } else {
                setBgImage('/images/concept/concept-bg-mobile.jpg');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full mt-4 lg:mt-10">
            {/* 背景を設定するための div */}
            <div
                className="w-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${bgImage})`,
                }}
            >
                {/* コンテンツ全体 */}
                <div className="flex flex-col lg:flex-row justify-center items-center w-full">
                    {/* 中央の写真 */}
                    <div className="mb-4 lg:mb-0 lg:ml-16 flex justify-center w-full lg:w-1/2 lg:max-w-3xl lg:px-8">
                        <img 
                            src="/images/concept/concept.JPG" 
                            alt="Concept Image" 
                            className="w-full h-auto sm:max-w-md lg:max-w-3xl shadow-lg lg:shadow-xl rounded-xl lg:rounded-2xl"
                        />
                    </div>

                    {/* 左側の説明文 */}
                    <div className="text-left max-w-md w-full lg:w-1/2 mb-4 lg:mb-0 px-4 lg:px-8 mt-10">
                        <h2 className="font-bold text-base sm:text-base md:text-lg lg:text-lg text-black mb-2" style={{ fontFamily: 'Paratino, serif' }}>
                            Cat House Macaron
                        </h2>
                        <p className="text-black text-sm sm:text-sm md:text-base lg:text-base mb-4">
                            一般家庭でブリードしています。<br />
                            取り扱い猫種はマンチカン、ミヌエット、<br />
                            スコティッシュフォールド、<br />
                            ゴールデンブリティッシュです。
                        </p>
                        <h2 className="font-bold text-base sm:text-base md:text-lg lg:text-lg text-black mt-10 mb-2" style={{ fontFamily: 'Paratino, serif' }}>
                            マカロンの意味
                        </h2>
                        <p className="text-black text-sm sm:text-sm md:text-base lg:text-base mb-4">
                            ［特別な存在］<br />
                            仔猫はあなたにとって<br />
                            特別な存在になります。<br />
                            仔猫にとっても飼い主さんは<br />
                            特別な存在です。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};