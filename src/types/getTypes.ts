// 子猫一覧データ
export interface KittensType {
    kittenId: number;
    breed: string;
    imageUrl: string;
    tranState: string;
    createdAt: string;
}

// 親猫一覧データ
export interface ParentCatsType {
    parentCatId: number;
    name: string;
    sex: number; // 0: オス, 1: メス
    breed: string;
    age: string;
    imageUrl: string;
}

export interface ParentCatDetailType {
    breedId: number;
    colorId: number;
    name: string;
    sex: number;
    age: number;
    birthDate: string;
    description: string;
    imageUrl: string;
}

// 猫色一覧データ
export interface BreedsType {
    breedId: number;
    breedName: string;
}

// 猫種一覧データ
export interface ColorsType {
    colorId: number;
    colorName: string;
}
