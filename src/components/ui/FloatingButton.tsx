"use client";

import React from "react";

interface FloatingButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, icon = "+" }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-500 text-white text-2xl w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600"
    >
      {icon}
    </button>
  );
};

export default FloatingButton;