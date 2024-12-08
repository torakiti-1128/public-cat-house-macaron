import apiClient from '@/lib/axios';
import { KittenDetailType, KittensType } from '@/types/types';

export const fetchKittens = async (): Promise<KittensType[]> => {
    try {
        const response = await apiClient.get<KittensType[]>('/kittens');
        return response.data;
    } catch (error) {
        console.error('子猫一覧の取得に失敗しました:', error);
        throw error;
    }
};

export const fetchKittenDetail = async (
    kittenId: number
): Promise<KittenDetailType> => {
    try {
        const response = await apiClient.get<KittenDetailType>(
            `/kittens/${kittenId}`
        );
        return response.data;
    } catch (error) {
        console.error('子猫詳細の取得に失敗しました:', error);
        throw error;
    }
};

export const postKitten = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/kittens', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('子猫情報の追加に失敗しました:', error);
        throw error;
    }
};


export const updateKitten = async (kittenId: number, formData: FormData) => {
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    try {
        const response = await apiClient.put(`/kittens/${kittenId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('子猫情報の更新に失敗しました:', error);
        throw error;
    }
};

export const deleteKitten = async (kittenId: number) => {
    try {
        const response = await apiClient.delete(`/kittens/${kittenId}`);
        return response.data;
    } catch (error) {
        console.error('子猫情報の削除に失敗しました:', error);
        throw error;
    }
};
