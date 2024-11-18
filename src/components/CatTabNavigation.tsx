'use client';

import React, { useState } from 'react';
import tabLinks from '@/data/catTabNavigation.json'; // JSONデータをインポート

const CatTabNavigation: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="bg-white shadow-md">
      {/* デスクトップナビゲーション */}
      <nav className="hidden md:flex justify-center gap-6 p-4" aria-label="Tabs">
        {tabLinks.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* モバイルナビゲーション */}
      <div className="md:hidden px-4 py-2">
        <button
          onClick={toggleDropdown}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm font-medium text-gray-500 hover:bg-gray-100"
        >
          メニュー
        </button>

        {isDropdownOpen && (
          <nav className="mt-2 space-y-2">
            {tabLinks.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default CatTabNavigation;