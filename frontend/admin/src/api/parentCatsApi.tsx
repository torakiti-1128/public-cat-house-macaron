import apiClient from '@/lib/axios';
import { ParentCatDetailType, ParentCatsType } from '@/types/types';

export const fetchParentCats = async (): Promise<ParentCatsType[]> => {
    try {
        const response = await apiClient.get<ParentCatsType[]>('/parent');
        return response.data;
    } catch (error) {
        console.error('親猫一覧の取得に失敗しました:', error);
        throw error;
    }
};

export const fetchParentCatDetail = async (
    parentCatId: number
): Promise<ParentCatDetailType> => {
    try {
        const response = await apiClient.get<ParentCatDetailType>(
            `/parent/${parentCatId}`
        );
        return response.data;
    } catch (error) {
        console.error('親猫詳細の取得に失敗しました:', error);
        throw error;
    }
};

export const postParentCat = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/parent', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('親猫情報の追加に失敗しました:', error);
        throw error;
    }
};

export const updateParentCat = async (
    parentCatId: number,
    formData: FormData
) => {
    try {
        const response = await apiClient.put(
            `/parent/${parentCatId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('親猫情報の更新に失敗しました:', error);
        throw error;
    }
};

export const deleteParentCat = async (parentCatId: number) => {
    try {
        const response = await apiClient.delete(`/parent/${parentCatId}`);
        return response.data;
    } catch (error) {
        console.error('親猫情報の削除に失敗しました:', error);
        throw error;
    }
};
