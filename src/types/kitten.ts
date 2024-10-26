//子猫の一覧表示情報
export interface KittenSelectType {
    "kittenId": number,
    "species": string,
}

//子猫の一覧表示情報
export interface KittenSelectMediaType {
    "kittenId": number,
    "species": string,
    "url": string | null,
}

//子猫の詳細情報
export interface KittenDetailType {
    "sex": string,
    "species": string,
    "color": string,
    "features": string,
    "birth": Date,
    "others": string,
}

//選択された子猫のメディアUrl情報
export interface KittenMediaType {
    url: string;
}


