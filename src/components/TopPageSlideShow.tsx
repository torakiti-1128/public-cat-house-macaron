import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/styles.css"; 

const kittens = [
  {
    image: "/images/cats/cat1.JPG",
    title: "お問合せ番号01",
    description: "スコティッシュフィールドの男の子",
  },
  {
    image: "/images/cats/cat2.JPG",
    title: "お問合せ番号02",
    description: "スコティッシュフィールドの男の子",
  },
  {
    image: "/images/cats/cat3.JPG",
    title: "お問合せ番号03",
    description: "スコティッシュフィールドの男の子",
  },
  {
    image: "/images/cats/cat4.JPG",
    title: "お問合せ番号04",
    description: "スコティッシュフィールドの男の子",
  },
  {
    image: "/images/cats/cat5.JPG",
    title: "お問合せ番号05",
    description: "スコティッシュフィールドの男の子",
  },
];

export default function TopPageSlideShow() {
  const slideSettings = {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
        slidesPerView: 2, // 3枚のスライドが表示されるように調整
        spaceBetween: 30, // カード間のスペースを増やす
      },
    1024: {
      slidesPerView: 3, // 3枚のスライドが表示されるように調整
      spaceBetween: 20, // カード間のスペースを増やす
    },
  };

    return (
    <div className="px-10">
        <div className="relative mt-20 mb-8 items-center w-full">
            <div className="flex items-center w-full">
                <span className="text-[#705C53] flex-grow border-t border-black"></span> {/* 左側の線 */}
                <h1 className="text-2xl text-black mx-4" style={{ fontFamily: 'Paratino, serif' }}>
                    ご家族募集中の子猫
                </h1>
                <span className="text-[#705C53] flex-grow border-t border-black"></span> {/* 右側の線 */}
            </div>
        </div>
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={slideSettings}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
            nextEl: ".custom-next",  // カスタムクラスを指定
            prevEl: ".custom-prev",  // カスタムクラスを指定
        }}
        pagination={{
          clickable: true,
        }}
        >
            {kittens.map((kitten, index) => (
                <SwiperSlide key={index} > {/* カードを中央揃え */}
                    <div className="bg-[#F5F5F7] rounded-2xl shadow" style={{ height: '420px'}}>
                    <a href="#">
                        <img className="rounded-t-2xl w-full" src={kitten.image} alt={kitten.title} style={{ height: '300px', objectFit: 'cover' }} />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="text-[#705C53] mb-2 text-2xl" style={{ fontFamily: 'Paratino, serif' }}>
                                {kitten.title}
                            </h5>
                        </a>
                        <p className="mb-3" style={{ fontFamily: 'Paratino, serif' }}>
                        {kitten.description}
                        </p>
                    </div>
                    </div>
                </SwiperSlide>
            ))}
        <div className="custom-prev">←</div> {/* カスタムボタン（戻る） */}
        <div className="custom-next">→</div> {/* カスタムボタン（次） */}
      </Swiper>
      <div className="text-center mt-10 flex justify-center items-center">
      <button 
      type="button" 
      onClick={() => window.location.href = process.env.NEXT_PUBLIC_BASE_URL + '/kittens'}
      className="mb-20 text-[#705C53] bg-[#EDDFE0] hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-[#EDDFE0] dark:hover:bg-gray-400 dark:focus:ring-gray-300">
            全ての子猫を見る
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
      </div>
    </div>
  );
}