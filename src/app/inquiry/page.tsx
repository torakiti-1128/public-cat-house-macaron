'use client'
import React from 'react'
import Inquiry from '@/components/Inquiry'

export default function InquiryPages() {
  // ビルドできないから一旦コメントアウト
  // const [formData, setFormData] = useState<Record<string, string>>({}); // フォームデータを管理
  // const [isSubmitting, setIsSubmitting] = useState(false); // 送信中の状態を管理
  // const [error, setError] = useState<string | null>(null); // エラーメッセージの管理
  // const [success, setSuccess] = useState<boolean>(false); // 成功メッセージの管理

  // const handleFormSubmit = async (data: Record<string, string>) => {
  //   setFormData(data);
  //   setIsSubmitting(true);
  //   setError(null);
  //   setSuccess(false);

  //   try {
  //     // APIリクエストの送信
  //     const response = await fetch('/api/send-inquiry', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to send inquiry: ${response.statusText}`);
  //     }

  //     setSuccess(true);
  //     console.log('送信成功:', data);
  //   } catch (error) {
  //     console.error('送信エラー:', error);
  //     setError('フォームの送信に失敗しました。もう一度お試しください。');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleFormSubmit = async () => {}

  return (
    <>
      <Inquiry onSubmit={handleFormSubmit} />
    </>
  )
}
