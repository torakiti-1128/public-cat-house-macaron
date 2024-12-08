'use client'

import React from 'react'
import footerData from '@/data/footer.json'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-700 body-font">
      <div className="container px-5 py-12 mx-auto text-center max-w-screen-lg">
        <div className="flex flex-wrap md:justify-between justify-center">
          {footerData.sections.map((section, index) => (
            <nav key={index} className="w-full md:w-1/3 mb-6">
              <h6 className="text-[#705C53] font-bold text-lg mb-4">
                {section.title}
                <span className="inline-block ml-2 text-pink-300">🐾</span>
              </h6>
              {section.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.href}
                  className="block mb-2 text-gray-600 hover:text-gray-200 transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-4">
            © 2024 Cat House Macaron - All Rights Reserved
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-200 transition"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-200 transition"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-200 transition"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
