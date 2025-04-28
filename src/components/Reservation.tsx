import React from 'react'
import reservationData from '../data/reservation.json'
import Title from './common/Title'

const Reservation: React.FC = () => {
  return (
    <section className="bg-[#FDF7F2] p-8">
      <div className="container mx-auto">
        <Title text="お取引方法" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {reservationData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#705C53]">
                {item.title}
              </h3>
              {item.content && (
                <p className="leading-relaxed mb-4">{item.content}</p>
              )}
              {item.list && (
                <ul className="list-disc pl-6 space-y-2">
                  {item.list.map((listItem, idx) => (
                    <li key={idx}>
                      {listItem}
                      {listItem === 'クレジットカード' && (
                        <>
                          <br />
                          <span className="text-sm text-[#FF0000] ml-2">
                            ※クレジットカードの場合、決済手数料を「3%」頂戴いたします。
                          </span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {item.note && (
                <p className="text-sm text-[#FF0000]">{item.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reservation
