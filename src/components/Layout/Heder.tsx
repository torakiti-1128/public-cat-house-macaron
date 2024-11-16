import React, { useState } from "react";
import "../../styles/styles.css";
import navigationData from "../../data/navigation.json"; // JSONファイルをインポート

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="z-50">
            <div className="container mx-auto flex flex-col items-center p-4">
                <div className="text-center mt-5 mb-4 hidden md:flex flex-col items-center">
                    <h1 className="font-bold text-4xl text-black" style={{ fontFamily: "Paratino, serif" }}>
                        Cat House Macaron
                    </h1>
                    <p className="text-gray-400 text-lg" style={{ fontFamily: "Paratino, serif" }}>
                        Life with a cat
                    </p>
                </div>
                <nav className="hidden md:flex space-x-8 font-hina-mincho mt-1 mb-5">
                    {navigationData.desktopLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="nav-link text-black font-medium hover:text-gray-800 transition"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
            {/* モバイル画面 */}
            <div className="md:hidden flex items-center justify-between w-full mb-5">
                <button
                    onClick={toggleMenu}
                    className="menu-button text-black focus:outline-none w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <div className="flex-grow text-center" style={{ transform: "translateX(-20px)" }}>
                    <h1 className="font-bold text-2xl" style={{ fontFamily: "Paratino, serif" }}>
                        Cat House Macaron
                    </h1>
                    <p className="text-gray-400 text-sm">Life with a cat</p>
                </div>
                <div className={`menu ${isMenuOpen ? "menu-open" : ""}`}>
                    <button
                        onClick={toggleMenu}
                        className="close-button absolute top-4 right-4 text-black focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <ul className="menu-items">
                        {navigationData.mobileLinks.map((link, index) => (
                            <li key={index}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
};