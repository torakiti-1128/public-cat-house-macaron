'use client'
import Inquiry from '@/components/Inquiry'
import { InquiryType } from '@/types/kitten'
import React from 'react'

export default function InquiryPages() {
  const handleFormSubmit = async (
    data: InquiryType
  ): Promise<{ message: string; isError: boolean }> => {
    try {
      const endpoint = process.env.NEXT_PUBLIC_BASE_URL + '/inquiry'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '送信に失敗しました')
      }

      return { message: '送信が完了しました', isError: false }
    } catch (error: any) {
      return { message: '送信中にエラーが発生しました', isError: true }
    }
  }

  return (
    <>
      <Inquiry onSubmit={handleFormSubmit} />
    </>
  )
}
