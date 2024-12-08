'use client'

import React from 'react'
import sideBarData from '@/data/sideBar.json'

// 作ったけど使わなかった
// 今後のために残す
const SideBar: React.FC = () => {
  return (
    <aside className="bg-white w-64 h-screen fixed hidden lg:block border-r border-gray-200">
      <div className="p-4 space-y-4">
        {sideBarData.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="block px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            {link.label}
          </a>
        ))}
      </div>
    </aside>
  )
}

export default SideBar
