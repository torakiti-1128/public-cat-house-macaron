'use client';

import React from 'react';

const Search: React.FC = () => {
  return (
    <div className="bg-white rounded-full border-none p-3 mb-4 shadow-md mx-4 lg:mx-0">
      <div className="flex items-center">
        <i className="px-3 fas fa-search"></i>
        <input
          type="text"
          placeholder="検索..."
          className="focus:outline-none w-full"
        />
      </div>
    </div>
  );
};

export default Search;