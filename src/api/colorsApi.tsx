import apiClient from '@/lib/axios';
import { ColorsType } from '@/types/types';

// カラー一覧を取得
export const fetchColors = async (): Promise<ColorsType[]> => {
    try {
        const response = await apiClient.get<ColorsType[]>('/colors');
        return response.data;
    } catch (error) {
        console.error('カラー一覧の取得に失敗しました:', error);
        throw error;
    }
};

// カラーを追加
export const postColor = async (colorName: string) => {
    try {
        const response = await apiClient.post(
            '/colors',
            new URLSearchParams({ colorName }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('カラーの追加に失敗しました:', error);
        throw error;
    }
};

// カラーを更新
export const updateColor = async (colorId: number, colorName: string) => {
    try {
        const response = await apiClient.put(
            `/colors/${colorId}`,
            new URLSearchParams({ colorId: colorId.toString(), colorName }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('カラーの更新に失敗しました:', error);
        throw error;
    }
};

// カラーを削除
export const deleteColor = async (colorId: number) => {
    try {
        const response = await apiClient.delete(`/colors/${colorId}`);
        return response.data;
    } catch (error) {
        console.error('カラーの削除に失敗しました:', error);
        throw error;
    }
};