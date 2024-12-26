import React from 'react'

interface ButtonProps {
  text: string //ボタンに表示するテキスト
  link: string //リンク先のURL
  id?: string 
  icon?: boolean //アイコン表示の切り替え
  additionalClasses?: string //必要に応じて追加のクラスを渡せる
}

const Button: React.FC<ButtonProps> = ({
  text,
  link,
  id,
  icon = false,
  additionalClasses = '',
}) => {
  const finalLink = id ? `${link}/${id}` : link

  return (
    <a
      href={finalLink}
      className={`text-[#FFFFFF] bg-[#705C53] hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-gray-400 dark:focus:ring-gray-300 ${additionalClasses}`}
    >
      {text}
      {icon && (
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      )}
    </a>
  )
}

export default Button
