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
    sex: number;
    breed: string;
    age: string;
    imageUrl: string;
}

// 親猫詳細データ
export interface ParentCatDetailType {
    parentCatId: number;
    breedId: number;
    colorId: number;
    name: string;
    sex: number;
    age: number;
    birthDate: string;
    description: string;
    imageUrl: string;
}

// 子猫詳細データ
export interface KittenDetailType {
    kittenId: number;
    fatherCatId: number;
    motherCatId: number;
    description: string;
    breedId: number;
    colorId: number;
    sex: number;
    birthDate: string;
    price: number;
    tranState: string;
    imageUrls: string[];
    videoUrl: string;
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
