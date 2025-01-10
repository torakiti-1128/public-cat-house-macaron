import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Button from './common/Button'
import { KittenListType } from '@/types/kitten'
import Title from './common/Title'
import { formatDateTimeToJapanese } from '@/hooks/datetimeConverter'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface KittensSlideShowProps {
  kittens: KittenListType[]
  status: string[] // 表示したい状態を指定
}

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
    slidesPerView: 2,
    spaceBetween: 40,
  },
}

export const KittensSlideShow: React.FC<KittensSlideShowProps> = ({
  kittens,
  status,
}) => {
  const [filteredKittens, setFilteredKittens] = useState<KittenListType[]>([])
  const router = useRouter()

  const handleViewDetails = (kittenId: number) => {
    router.push(
      `/kittens/${kittenId}?kittens=${encodeURIComponent(JSON.stringify(kittens))}`
    )
  }
  // 状態でフィルタリング
  useEffect(() => {
    const filteredByStatus = kittens?.filter((kitten) =>
      status.includes(kitten.tranState)
    )
    setFilteredKittens(filteredByStatus)
  }, [kittens, status])

  return (
    <div className="container px-5 mx-auto mt-10">
      <div className="relative mt-10 mb-8 w-full items-center">
        <Title text="ご家族募集中の子猫" />
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={slideSettings}
        slidesPerView={'auto'}
        centeredSlides={true}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        pagination={{
          clickable: true,
        }}
      >
        {filteredKittens?.map((kitten, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-gray-100 rounded-2xl shadow overflow-hidden"
              style={{ height: '500px' }}
            >
              <a onClick={() => handleViewDetails(kitten.kittenId)}>
                <img
                  className="w-full"
                  src={kitten.imageUrl}
                  alt={kitten.kittenId.toString()}
                  style={{
                    height: '350px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                  }}
                />
              </a>
              <div className="p-5">
                <a onClick={() => handleViewDetails(kitten.kittenId)}>
                  <h5
                    className="text-[#705C53] mb-2 text-2xl"
                    style={{ fontFamily: 'Paratino, serif' }}
                  >
                    子猫番号：{kitten.kittenId}
                  </h5>
                </a>
                <p style={{ fontFamily: 'Paratino, serif' }}>
                  猫種：{kitten.breed}
                </p>
                <p style={{ fontFamily: 'Paratino, serif' }}>
                  取引状態：{kitten.tranState}
                </p>
                <p style={{ fontFamily: 'Paratino, serif' }}>
                掲載日時：
                  <span>{formatDateTimeToJapanese(kitten.createdAt)}</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-prev">←</div>
        <div className="custom-next">→</div>
      </Swiper>

      <div className="text-center mt-10 flex justify-center items-center">
        <Button text={'すべての子猫を見る'} link={'/kittens'} />
      </div>
    </div>
  )
}

export default KittensSlideShow
