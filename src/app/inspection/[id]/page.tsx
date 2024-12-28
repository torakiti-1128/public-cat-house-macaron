'use client'
import React from 'react'
import Inquiry from '@/components/Inspection'
import { InspectionType } from '@/types/kitten'

interface InquiryKittenIdProps {
  params: {
    id: string // URLのパラメータ
  }
}

export default function InspectionBeforeKittenDetailPages({
  params,
}: InquiryKittenIdProps) {
  const kittenId = Number(params.id)

  const handleFormSubmit = async (
    data: InspectionType
  ): Promise<{ message: string; isError: boolean }> => {
    try {
      const endpoint = process.env.NEXT_PUBLIC_BASE_URL + '/inquiry/inspection'

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
      <Inquiry onSubmit={handleFormSubmit} kittenId={kittenId} />
    </>
  )
}
