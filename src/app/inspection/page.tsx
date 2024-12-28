'use client'
import React from 'react'
import { InspectionType } from '@/types/kitten'
import Inspection from '@/components/Inspection'

export default function InspectionPages() {
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
    } catch (error) {
      if (error instanceof Error) {
        return { message: '送信中にエラーが発生しました', isError: true }
      } else {
        return { message: '予期せぬエラーが発生しました', isError: true }
      }
    }
  }

  return (
    <>
      <Inspection onSubmit={handleFormSubmit} />
    </>
  )
}
