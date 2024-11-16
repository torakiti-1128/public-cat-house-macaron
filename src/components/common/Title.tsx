import React from "react";

interface TitleProps {
  text: string;
  additionalClasses?: string;
}

const Title: React.FC<TitleProps> = ({ text, additionalClasses = "" }) => {
  return (
    <h2 className={`subpage-title text-2xl font-bold text-center mb-8 ${additionalClasses}`}>
      {text}
    </h2>
  );
};

export default Title;