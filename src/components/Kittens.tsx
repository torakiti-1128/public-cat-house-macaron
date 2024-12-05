'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { KittensType } from '@/types/getTypes';

interface KittensProps {
    kittens: KittensType[];
}

const Kittens: React.FC<KittensProps> = ({ kittens }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(
        null
    );

    // モーダルを開く関数
    const openModal = (content: React.ReactNode) => {
        setModalContent(content);
        setModalOpen(true);
    };

    // モーダルを閉じる関数
    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    return (
        <div className="container mx-auto p-4 relative">
            <h1 className="text-3xl font-bold mb-6">子猫一覧</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kittens.map((kitten) => (
                    <Card key={kitten.kittenId} imageUrl={kitten.imageUrl}>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-semibold">
                                {kitten.breed}
                            </h2>
                            <p className="text-sm text-gray-500">
                                お問い合わせ番号: {kitten.kittenId}
                            </p>
                            <p className="text-sm text-gray-500">
                                取引状態: {kitten.tranState}
                            </p>
                            <p className="text-sm text-gray-500">
                                登録日:{' '}
                                {new Date(
                                    kitten.createdAt
                                ).toLocaleDateString()}
                            </p>
                            {/* ボタン追加 */}
                            <div className="flex gap-2 mt-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() =>
                                        openModal(
                                            <div>
                                                <h2 className="text-xl font-bold mb-4">
                                                    子猫情報編集
                                                </h2>
                                                <input
                                                    type="text"
                                                    defaultValue={kitten.breed}
                                                    placeholder="品種"
                                                    className="border w-full p-2 rounded mb-4"
                                                />
                                                <input
                                                    type="text"
                                                    defaultValue={
                                                        kitten.tranState
                                                    }
                                                    placeholder="取引状態"
                                                    className="border w-full p-2 rounded mb-4"
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                                        onClick={() =>
                                                            console.log(
                                                                'クリアがクリックされました'
                                                            )
                                                        }
                                                    >
                                                        クリア
                                                    </button>
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                                        onClick={() =>
                                                            console.log(
                                                                '送信がクリックされました'
                                                            )
                                                        }
                                                    >
                                                        送信
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                >
                                    編集
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() =>
                                        console.log('消去がクリックされました')
                                    }
                                >
                                    消去
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            {/* モーダル */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default Kittens;
