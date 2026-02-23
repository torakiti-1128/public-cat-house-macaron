import apiClient from '@/lib/axios';
import { AdoptionCatDetailType, AdoptionCatsType } from '@/types/types';

export const fetchAdoptionCats = async (): Promise<AdoptionCatsType[]> => {
    try {
        const response = await apiClient.get<AdoptionCatsType[]>('/adoption');
        return response.data;
    } catch (error) {
        console.error('里親募集中猫一覧の取得に失敗しました:', error);
        throw error;
    }
};

export const fetchAdoptionCatDetail = async (
    adoptionCatId: number
): Promise<AdoptionCatDetailType> => {
    try {
        const response = await apiClient.get<AdoptionCatDetailType>(
            `/adoption/${adoptionCatId}`
        );
        return response.data;
    } catch (error) {
        console.error('里親募集中猫詳細の取得に失敗しました:', error);
        throw error;
    }
};

export const postAdoptionCat = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/adoption', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('里親募集中猫情報の追加に失敗しました:', error);
        throw error;
    }
};

export const updateAdoptionCat = async (
    adoptionCatId: number,
    formData: FormData
) => {
    try {
        const response = await apiClient.put(
            `/adoption/${adoptionCatId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('里親募集中猫情報の更新に失敗しました:', error);
        throw error;
    }
};

export const deleteAdoptionCat = async (adoptionCatId: number) => {
    try {
        const response = await apiClient.delete(`/adoption/${adoptionCatId}`);
        return response.data;
    } catch (error) {
        console.error('里親募集中猫情報の削除に失敗しました:', error);
        throw error;
    }
};
