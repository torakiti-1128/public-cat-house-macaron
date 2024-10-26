import React, { useState } from 'react';
import "../styles/styles.css";

export const Contact = () => {
    return (
        <section style={{ 
            fontFamily: 'Paratino, serif',
            backgroundImage: `url('/images/top-bg.pn')`,  
            backgroundSize: 'cover',                          
            backgroundPosition: 'center',                     
            backgroundRepeat: 'no-repeat',
            }}>
            <div className="px-8 py-30 mx-auto md:px-12 lg:px-24 max-w-8xl relative">
                <dl
                className="grid text-center mt-12 sm:grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16"
                >
                <div className="flex h-full flex-col text-sm justify-between bg-color-3 rounded-lg p-4 paper-texture">
                    <div>
                    <dt className="flex flex-col gap-2 tracking-tighter text-xs">
                        <h3 className="tracking-tight text-xl font-medium text-base-900">
                        5つのお約束
                        </h3>
                    </dt>
                    <dd className="mt-2">
                        <p className="text-base font-medium text-base-500">
                        子猫をお迎えいただく方にいくつかの大切なお約束をお願いしております。お約束を守れる方のみ、子猫を譲渡させていただきます。
                        </p>
                    </dd>
                    </div>
                    <a
                    className="text-sm font-medium text-accent-500 duration-300 hover:text-base-900 flex items-center gap-2 mx-auto mt-4"
                    href="#_"
                    >
                    確認する
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right size-4"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                    </a>
                </div>
                <div className="flex h-full flex-col text-sm justify-between bg-color-3 rounded-lg p-4 paper-texture">
                    <div>
                    <dt className="flex flex-col gap-2 tracking-tighter text-xs">
                        <h3 className="tracking-tight text-xl font-medium text-base-900">
                        お取引方法
                        </h3>
                    </dt>
                    <dd className="mt-2">
                        <p className="text-base font-medium text-base-500">
                        子猫の幸せを第一に考えていますので、購入の意思がない方の見学はお断りしております。見学予約は公式LINEやお問い合わせフォームから可能です。ご確認後にご検討ください。
                        </p>
                    </dd>
                    </div>
                    <a
                    className="text-sm font-medium text-accent-500 duration-300 hover:text-base-900 flex items-center gap-2 mx-auto mt-4"
                    href="#_"
                    >
                    確認する
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right size-4"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                    </a>
                </div>
                <div className="flex h-full flex-col text-sm justify-between bg-color-3 rounded-lg p-4 paper-texture">
                    <div>
                    <dt className="flex flex-col gap-2 tracking-tighter text-xs">
                        <h3 className="tracking-tight text-xl font-medium text-base-900">
                        生体保証について
                        </h3>
                    </dt>
                    <dd className="mt-2">
                        <p className="text-base font-medium text-base-500">
                        生体保証に関する詳細情報を確認いただけます。
                        子猫のお迎えを検討されている方には、ぜひご確認いただきたい重要な内容です。
                        </p>
                    </dd>
                    </div>
                    <a
                    className="text-sm font-medium text-accent-500 duration-300 hover:text-base-900 flex items-center gap-2 mx-auto mt-4"
                    href="#_"
                    >
                    確認する
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right size-4"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                    </a>
                </div>
                <div className="flex h-full flex-col text-sm justify-between bg-color-3 rounded-lg p-4 paper-texture">
                    <div>
                    <dt className="flex flex-col gap-2 tracking-tighter text-xs">
                        <h3 className="tracking-tight text-xl font-medium text-base-900">
                        猫舎紹介
                        </h3>
                    </dt>
                    <dd className="mt-2">
                        <p className="text-base font-medium text-base-500">
                        子猫の幸せを第一に考えていますので、購入の意思がない方の見学はお断りしております。見学予約は公式LINEやお問い合わせフォームから可能です。ご確認後にご検討ください。
                        </p>
                    </dd>
                    </div>
                    <a
                    className="text-sm font-medium text-accent-500 duration-300 hover:text-base-900 flex items-center gap-2 mx-auto mt-4"
                    href="#_"
                    >
                    確認する
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right size-4"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                    </a>
                </div>
                </dl>
            </div>
        </section>
    );
};