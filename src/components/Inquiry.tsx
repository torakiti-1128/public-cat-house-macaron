import { useState } from "react";
import { DateTimePicker } from "./DataTimePicker";

export const Inquiry = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="isolate bg-[#FDF7F2] px-6 py-8 sm:py-32" style={{ fontFamily: 'Paratino, serif' }}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-[#705C53] sm:text-2xl subpage-title">ご見学について</h2>
        <p className="mt-5 text-base leading-8 text-[#705C53]">
          当店では猫ちゃんの幸せを何よりも願っております。<br/>
          そのため、購入意志がない方のご見学はお断りさせていただいておりますので、あらかじめご了承ください。<br/>
          募集中の子猫で気に入った子猫が見つかりましたら、公式LINEまたは下記のお問い合わせフォームより必要事項をご記入の上、ご見学予約をお願いいたします。
        </p>
        <div className="my-6 flex justify-center">
          <img 
            src="/images/two-cat.JPG" 
            alt="Two Cats" 
            className="rounded-lg shadow-lg border-4 border-[#EDDFE0]"
          />
        </div>

        <p className="text-base leading-8 text-[#705C53]">
          遠方の方は、LINEのビデオ通話でオンライン見学も承っております。
          但し2020年6月から「動物愛護及び管理に関する法律の一部を改正する法律」により当猫舎にて対面生体確認が必要となりました。
          オンライン見学後ご購入時に一度、当猫舎にお越しいただく必要がございます。<br/>
        </p>
      </div>

      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-[#705C53]">苗字(フリガナ)</label>
            <div className="mt-2.5">
              <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-full border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-[#705C53]">名前(フリガナ)</label>
            <div className="mt-2.5">
              <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-full border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6" />
            </div>
          </div>

          {/* DateTimePicker の追加 */}
          <div className="sm:col-span-2">
            <label htmlFor="datetime" className="block text-sm font-semibold leading-6 text-[#705C53]">ご希望日時</label>
            <div className="mt-2.5">
              <DateTimePicker />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-semibold leading-6 text-[#705C53]">ご住所</label>
            <div className="mt-2.5">
              <input type="text" name="address" id="address" autoComplete="organization" className="block w-full rounded-full border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-[#705C53]">メールアドレス</label>
            <div className="mt-2.5">
              <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-full border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-[#705C53]">電話番号</label>
            <div className="relative mt-2.5">
              <input type="tel" name="phone-number" id="phone-number" autoComplete="tel" className="block w-full rounded-full border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6" />
            </div>
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-[#705C53]">その他</label>
            <div className="mt-2.5">
              <textarea name="message" id="message" rows={4} className="block w-full rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button type="button" onClick={handleModalOpen} className="block w-full rounded-full bg-[#705C53] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-[#583d2f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#705C53]">
            注意事項
          </button>
        </div>

        {/* モーダル */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto text-left shadow-lg" style={{ fontFamily: 'Paratino, serif' }}>
              <h2 className="text-2xl font-semibold text-center text-[#705C53]">送信前の注意事項</h2>
              <p className="mt-4 text-[#705C53]">
                こちらは猫カフェやペットショップではございませんので、子猫の体調・ストレスを考えて子猫をむやみにお見せすることはできませんが、ペットショップでは会えないパパ、ママ猫にも会っていただけます。<br /><br />
                必ずご家族の同意、アレルギーの有無、譲渡費用をご確認いただき納得された上でのご見学をお願いいたします。
              </p>
              <div className="mt-4 flex items-center justify-center">
                <input
                  type="checkbox"
                  id="confirm"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="h-4 w-4 text-[#705C53] border-gray-300 rounded focus:ring-[#705C53]"
                />
                <label htmlFor="confirm" className="ml-2 text-sm text-[#705C53]">確認しました</label>
              </div>
              <div className="mt-6">
                <button onClick={handleModalClose} className="text-sm text-[#705C53] font-semibold hover:underline">閉じる</button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <button type="submit" disabled={!isChecked} className={`block w-full rounded-full px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md ${isChecked ? "bg-[#705C53] hover:bg-[#583d2f]" : "bg-gray-400 cursor-not-allowed"}`}>
            送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inquiry;