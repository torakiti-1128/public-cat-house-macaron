import React from 'react'

interface ButtonProps {
  text: string //ボタンに表示するテキスト
  link: string //リンク先のURL
  id?: string
  additionalClasses?: string //必要に応じて追加のクラスを渡せる
}

const Button: React.FC<ButtonProps> = ({
  text,
  link,
  id,
  additionalClasses = '',
}) => {
  const finalLink = id ? `${link}/${id}` : link

  return (
    <a
      href={finalLink}
      className={`text-[#FFFFFF] bg-[#705C53] hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:hover:bg-gray-400 dark:focus:ring-gray-300 ${additionalClasses}`}
    >
      {text}
    </a>
  )
}

export default Button
