import React from 'react';

interface ErrorContentProps {
  error?: string[]; // 親コンポーネントから渡されるエラーメッセージ
  children: React.ReactNode; // 子コンポーネントとして渡される写真
}

const ErrorContent: React.FC<ErrorContentProps> = ({ error, children }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      {/* 写真を中央に表示 */}
      <div className="mb-4">{children}</div>
      {/* エラーメッセージを表示 */}
      {error && <div className="text-red-500 text-center">
        {error.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>}
    </div>
  );
};

export default ErrorContent;