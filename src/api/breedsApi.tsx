import apiClient from '@/lib/axios';
import { BreedsType } from '@/types/types';

// 猫種一覧を取得
export const fetchBreeds = async (): Promise<BreedsType[]> => {
    try {
        const response = await apiClient.get<BreedsType[]>('/breeds');
        return response.data;
    } catch (error) {
        console.error('猫種一覧の取得に失敗しました:', error);
        throw error;
    }
};

// 猫種を追加
export const postBreed = async (breedName: string) => {
    try {
        const response = await apiClient.post(
            '/breeds',
            new URLSearchParams({ breedName }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('猫種の追加に失敗しました:', error);
        throw error;
    }
};

// 猫種を更新
export const updateBreed = async (breedId: number, breedName: string) => {
    try {
        const response = await apiClient.put(
            `/breeds/${breedId}`,
            new URLSearchParams({ breedId: breedId.toString(), breedName }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('猫種の更新に失敗しました:', error);
        throw error;
    }
};

// 猫種を削除
export const deleteBreed = async (breedId: number) => {
    try {
        const response = await apiClient.delete(`/breeds/${breedId}`);
        return response.data;
    } catch (error) {
        console.error('猫種の削除に失敗しました:', error);
        throw error;
    }
};