import { useState } from 'react'
import inquiryData from '../data/inquiry.json'
import Title from './common/Title'
import { InspectionType } from '@/types/kitten'

interface InquiryProps {
  onSubmit: (formData: InspectionType) => void // 親にデータを渡す
  kittenId?: number
}

const Inquiry: React.FC<InquiryProps> = ({ onSubmit, kittenId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [localFormData, setLocalFormData] = useState<Record<string, string>>({
    'kitten-id': kittenId ? "問い合わせ番号：" + kittenId.toString() : '', 
  })

  // 入力内容の変更を管理
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target
    setLocalFormData((prev) => ({ ...prev, [id]: value }))
  }

  // モーダル管理
  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  // 送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 渡ってきたデータをマッピング
    const inspectionData: InspectionType = {
      address: localFormData.address,
      email: localFormData.email,
      firstName: localFormData["first-name"],
      kittenId: localFormData["kitten-id"],
      lastName: localFormData["last-name"],
      message: localFormData.message,
      petStatus: localFormData["pet-status"],
      phoneNumber: localFormData["phone-number"],
      visitDate: localFormData["visit-date-date"],
      visitTime: localFormData["visit-date-time"],
      visitMethod: localFormData["visit-method"],
      visitPeople: localFormData["visit-people"],
    }

    onSubmit(inspectionData)
  }

  return (
    <div
      className="bg-[#FDF7F2] px-10 py-8"
      style={{ fontFamily: 'Paratino, serif' }}
    >
      <div className="text-center container mx-auto">
        <Title text={inquiryData.title} />
        <p className="bg-[#FFF0F6] border-2 border-[#F9CCE3] rounded-lg p-6 mt-10 text-base leading-8 text-[#705C53] sm:mx-20 lg:mx-40 shadow-lg relative">
          {inquiryData.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {inquiryData.fields.map((field) => (
            <div key={field.id} className={field.rows ? 'sm:col-span-2' : ''}>
              <label
                htmlFor={field.id}
                className="block text-sm font-semibold leading-6 text-[#705C53]"
              >
                {field.label}
              </label>
              <div className="mt-2.5">
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    rows={field.rows}
                    value={localFormData[field.id] || ''}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6"
                  ></textarea>
                ) : field.id === 'visit-date' ? (
                  <div className="flex gap-4">
                    <input
                      type="date"
                      id={`${field.id}-date`}
                      value={localFormData[`${field.id}-date`] || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-full border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6"
                    />
                    <select
                      id={`${field.id}-time`}
                      value={localFormData[`${field.id}-time`] || ''}
                      onChange={handleInputChange}
                      className="block w-full rounded-full border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6"
                    >
                      <option value="" disabled>
                        時間
                      </option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                    </select>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    value={localFormData[field.id] || ''}
                    autoComplete={field.autocomplete}
                    onChange={handleInputChange}
                    className="block w-full rounded-full border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={handleModalOpen}
            className="block w-full rounded-full bg-[#705C53] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-[#583d2f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#705C53]"
          >
            注意事項
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto text-left shadow-lg">
              <h2 className="text-2xl font-semibold text-center text-[#705C53]">
                {inquiryData.modal.title}
              </h2>
              {inquiryData.modal.content.map((item, index) => (
                <p key={index} className="mt-4 text-[#705C53]">
                  {item}
                </p>
              ))}
              <div className="mt-4 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="h-4 w-4 text-[#705C53] border-gray-300 rounded focus:ring-[#705C53]"
                />
                <label
                  htmlFor="confirm"
                  className="ml-2 text-sm text-[#705C53]"
                >
                  確認しました
                </label>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleModalClose}
                  className="text-sm text-[#705C53] font-semibold hover:underline"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            type="submit"
            disabled={!isChecked}
            className={`block w-full rounded-full px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md ${
              isChecked
                ? 'bg-[#705C53] hover:bg-[#583d2f]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            送信
          </button>
        </div>
      </form>
    </div>
  )
}

export default Inquiry