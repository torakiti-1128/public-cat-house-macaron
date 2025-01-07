// 子猫一覧データ
export interface KittensType {
    kittenId: number;
    breed: string;
    imageUrl: string;
    tranState: string;
    createdAt: string;
}

// 子猫詳細
export interface KittenDetailType {
    kittenId: number; // お問い合わせ番号
    fatherCatId: number; // お父さん猫番号
    motherCatId: number; // お母さん猫番号
    description: string; // 説明
    breed: string; // 猫種
    color: string; // カラー
    sex: number; // 性別
    birthDate: string; // 生年月日
    tranState: string; // 取引状況
    price: number; // 価格
    imageUrls: MediaDTO[]; // 画像リスト
    videoUrls: MediaDTO[]; // 動画リスト
}

// 子猫のメディア詳細
export interface MediaDTO {
    id: number; // メディアID
    url: string; // メディアURL
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
    breed: string;
    color: string;
    name: string;
    sex: number;
    age: number;
    birthDate: string;
    description: string;
    imageUrl: string;
}

// 里親募集中の猫一覧データ
export interface AdoptionCatsType {
    adoptionCatId: number;
    name: string;
    sex: number;
    breed: string;
    age: string;
    imageUrl: string;
}

// 里親募集中の猫詳細データ
export interface AdoptionCatDetailType {
    adoptionCatId: number;
    breed: string;
    color: string;
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
