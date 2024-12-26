'use client'
import React from 'react'
import Inquiry from '@/components/Inquiry'
import { InspectionType } from '@/types/kitten'

interface InquiryKittenIdProps {
params: {
    id: string // URLのパラメータ
  }
}

export default function InquiryBeforeKittenDetailPages({ params }: InquiryKittenIdProps) {
  const kittenId = Number(params.id)

  const handleFormSubmit = async (data: InspectionType) => {
    try {
      const endpoint = process.env.NEXT_PUBLIC_BASE_URL + "/inquiry/inspection";
  
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      console.log("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <>
      <Inquiry onSubmit={handleFormSubmit} kittenId={kittenId}/>
    </>
  )
}
