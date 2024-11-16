import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/styles.css"; 
import Button from "./common/Button";

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

const slideSettings = {
    0: {
        slidesPerView: 1,
        spaceBetween: 10,
    },
    768: {
        slidesPerView: 2,
        spaceBetween: 30,
    },
    1024: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
};

export const TopPageSlideShow: React.FC = () => {
    return (
        <div className="container px-5 mx-auto mt-10">
            <div className="relative mt-10 mb-8 w-full flex justify-center items-center">
                <h1 className="text-xl text-black subpage-title text-center w-full" style={{ fontFamily: 'Paratino, serif' }}>
                    ご家族募集中の子猫
                </h1>
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
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                pagination={{
                    clickable: true,
                }}
            >
                {kittens.map((kitten, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-[#FFFFFF] rounded-2xl shadow" style={{ height: '500px' }}>
                            <a href="#">
                                <img 
                                    className="rounded-t-2xl w-full" 
                                    src={kitten.image} 
                                    alt={kitten.title} 
                                    style={{ height: '300px', objectFit: 'cover' }} 
                                />
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
                <div className="custom-prev">←</div>
                <div className="custom-next">→</div>
            </Swiper>

            <div className="text-center mt-10 flex justify-center items-center">
                <Button
                    text={"すべての子猫を見る"}
                    link={"/kittens"}
                    icon={true}
                />
            </div>
        </div>
    );
}