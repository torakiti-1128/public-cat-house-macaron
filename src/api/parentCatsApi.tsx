import apiClient from '@/lib/axios';
import { ParentCatsType } from '@/types/getTypes';

export const fetchParentCats = async (): Promise<ParentCatsType[]> => {
    try {
        const response = await apiClient.get<ParentCatsType[]>('/parent');
        return response.data;
    } catch (error) {
        console.error('親猫一覧の取得に失敗しました:', error);
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

export const deleteParentCat = async (parentCatId: number) => {
    try {
        const response = await apiClient.delete(`/parent/${parentCatId}`);
        return response.data;
    } catch (error) {
        console.error('親猫情報の削除に失敗しました:', error);
        throw error;
    }
};
