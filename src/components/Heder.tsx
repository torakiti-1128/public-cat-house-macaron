import React, { useState } from 'react';
import "../styles/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = () => {
        window.scrollTo({
          top: window.innerHeight, // 画面の高さ分スクロール
          behavior: 'smooth', // スムーズにスクロール
        });
      };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="z-50">
            <div className="container mx-auto flex flex-col items-center p-4">
                <div className="text-center mt-5 mb-4 hidden md:flex flex-col items-center ">
                    <h1 className="font-bold text-4xl text-black" style={{ fontFamily: 'Paratino, serif' }}>Cat House Macaron</h1>
                    <p className="text-gray-400 text-lg" style={{ fontFamily: 'Paratino, serif' }}>Life with a cat</p>
                </div>
                <nav className="hidden md:flex space-x-8 font-hina-mincho mt-1 mb-10">
                    <a href="/" className="nav-link text-black font-medium hover:text-gray-800 transition">ホーム</a>
                    <a href="/kittens" className="nav-link text-black font-medium hover:text-gray-800 transition">子猫紹介</a>
                    <a href="#" className="nav-link text-black font-medium hover:text-gray-800 transition">Cat House Macaronについて</a>
                    <a href="#" className="nav-link text-black font-medium hover:text-gray-800 transition">お取引方法と5つのお約束</a>
                    <a href="/inquiry" className="nav-link text-black font-medium hover:text-gray-800 transition">お問い合わせ</a>
                </nav>
            </div>
            {/* モバイル画面 */}
            <div className="md:hidden flex items-center justify-between w-full">
                <button onClick={toggleMenu} className="menu-button text-black focus:outline-none w-12 h-12 mr-2 flex items-center justify-center hover:bg-gray-200 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <div className="flex-grow text-center" style={{ transform: 'translateX(-20px)' }}>
                    <h1 className="font-bold text-2xl" style={{ fontFamily: 'Paratino, serif' }}>Cat House Macaron</h1>
                    <p className="text-gray-400 text-sm">Life with a cat</p>
                </div>
                <div className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
                    <button onClick={toggleMenu} className="close-button absolute top-4 right-4 text-black focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <ul className="menu-items">
                        <li><a href="/">ホーム</a></li>
                        <li><a href="/kittens">子猫紹介</a></li>
                        <li><a href="#">Cat House Macaronについて</a></li>
                        <li><a href="#">お取引方法と5つのお約束</a></li>
                        <li><a href="/inquiry">お問い合わせ</a></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};