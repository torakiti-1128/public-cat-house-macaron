import React from "react";

interface CardProps {
  title: string;
  content: string;
  list?: string[];
  note?: string;
}

const Card: React.FC<CardProps> = ({ title, content, list, note }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <h3 className="text-xl font-semibold mb-4 text-[#705C53]">{title}</h3>
      {content && <p className="leading-relaxed mb-4">{content}</p>}
      {list && (
        <ul className="list-disc pl-6 space-y-2">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {note && <p className="text-sm text-[#B7B7B7] leading-relaxed">{note}</p>}
    </div>
  );
};

export default Card;