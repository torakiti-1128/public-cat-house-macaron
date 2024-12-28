import { useState } from 'react'
import inspectionData from '../data/inspection.json'
import Title from './common/Title'
import { InspectionType } from '@/types/kitten'

interface InspectionProps {
  onSubmit: (
    formData: InspectionType
  ) => Promise<{ message: string; isError: boolean }>
  kittenId?: number
}

const Inspection: React.FC<InspectionProps> = ({ onSubmit, kittenId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localFormData, setLocalFormData] = useState<Record<string, string>>({
    'kitten-id': kittenId ? '問い合わせ番号：' + kittenId.toString() : '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submissionMessage, setSubmissionMessage] = useState<{
    message: string
    isError: boolean
  } | null>(null)

  // 入力内容の変更を管理
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target
    setLocalFormData((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: '' })) // エラーをクリア
  }

  // モーダル管理
  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  // 入力必須チェック
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    inspectionData.fields.forEach((field) => {
      if (!localFormData[field.id]) {
        newErrors[field.id] = `${field.label}は必須です`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmissionMessage(null) // メッセージをリセット
    try {
      // 渡ってきたデータをマッピング
      const inspectionData: InspectionType = {
        address: localFormData.address,
        email: localFormData.email,
        firstName: localFormData['first-name'],
        kittenId: localFormData['kitten-id'],
        lastName: localFormData['last-name'],
        message: localFormData.message,
        petStatus: localFormData['pet-status'],
        phoneNumber: localFormData['phone-number'],
        visitDate: localFormData['visit-date-date'],
        visitTime: localFormData['visit-date-time'],
        visitMethod: localFormData['visit-method'],
        visitPeople: localFormData['visit-people'],
      }

      const result = await onSubmit(inspectionData)
      setSubmissionMessage(result)
    } catch (error) {
      if (error instanceof Error) {
        // Error 型の場合、メッセージを設定
        setSubmissionMessage({ message: error.message, isError: true })
      } else {
        // Error 型でない場合、デフォルトのメッセージを設定
        setSubmissionMessage({
          message: '予期しないエラーが発生しました',
          isError: true,
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="bg-[#FDF7F2] px-10 py-8"
      style={{ fontFamily: 'Paratino, serif' }}
    >
      <div className="text-center container mx-auto">
        <Title text={inspectionData.title} />
        <p className="bg-[#FFF0F6] border-2 border-[#F9CCE3] rounded-lg p-6 mt-10 text-base leading-8 text-[#705C53] sm:mx-20 lg:mx-40 shadow-lg relative">
          {inspectionData.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {inspectionData.fields.map((field) => (
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
                    className={`block w-full rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6 ${
                      errors[field.id] ? 'border-red-500 ring-red-500' : ''
                    }`}
                  ></textarea>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    value={localFormData[field.id] || ''}
                    autoComplete={field.autocomplete}
                    onChange={handleInputChange}
                    className={`block w-full rounded-full border-0 px-3.5 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-[#EDDFE0] placeholder:text-[#B7B7B7] focus:ring-2 focus:ring-inset focus:ring-[#705C53] sm:text-sm sm:leading-6 ${
                      errors[field.id] ? 'border-red-500 ring-red-500' : ''
                    }`}
                  />
                )}
              </div>
              {errors[field.id] && (
                <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
              )}
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
            <div className="bg-white rounded-lg sm: mx-5 p-6 max-w-md mx-auto text-left shadow-lg">
              <h2 className="text-2xl font-semibold text-center text-[#705C53]">
                {inspectionData.modal.title}
              </h2>
              {inspectionData.modal.content.map((item, index) => (
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
            disabled={!isChecked || isSubmitting}
            className={`block w-full rounded-full px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md ${
              isChecked
                ? 'bg-[#705C53] hover:bg-[#583d2f]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span className="flex justify-center items-center">
                <span className="loader mr-2"></span>送信中...
              </span>
            ) : (
              '送信'
            )}
          </button>
        </div>

        {submissionMessage && (
          <div
            className={`mt-4 p-4 rounded-lg text-center ${
              submissionMessage.isError
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {submissionMessage.message}
          </div>
        )}
      </form>
    </div>
  )
}

export default Inspection
