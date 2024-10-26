//選択された子猫の親猫情報
export interface ParentCatIdType {
    "fatherCatId": number,
    "motherCatId": number,
}

//親猫の詳細情報
export interface ParentCatDetailType {
    "name": string,
    "introduction": string,
    "media_url": string,
}