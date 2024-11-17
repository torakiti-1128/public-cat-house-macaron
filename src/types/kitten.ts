//子猫一覧
export interface KittenListType {
    "kittenId": number, //お問い合わせ番号
    "breed": string, //猫種
    "tranStatus": string, //取引状態
    "url": string, //画像URL
}

//子猫詳細
export interface KittenDetailType {
    "kittenId": string, //お問い合わせ番号
    "fatherCatId": number, //お父さん猫番号
    "motherCatId": number, //お母さん猫番号
    "description": string, //説明
    "breed": string, //猫種
    "color": string, //カラー
    "birthDate": string, //生年月日
    "price": number, //価格
}

//子猫詳細画像
export interface KittenDetailImageType {
    "imageId": string, //写真番号
    "kittenId": string, //お問い合わせ番号
    "url": string, //画像URL
}

//子猫詳細動画
export interface KittenDetailVideoType {
    "videoId": string, //ビデオ番号
    "kittenId": string, //お問い合わせ番号
    "url": string, //動画URL
}

//親猫
export interface ParentCatKittenDetailType {
    "parentCatId": number, //親猫番号
    "name": string, //名前
    "sex": string, //性別
    "breed": string, //猫種
    "description": string, //説明
    "url": string, //画像URL
}

//親猫
export interface ParentCatListType {
    "parentCatId": number, //親猫番号
    "name": string, //名前
    "sex": string, //性別
    "birthDate": number, //生年月日
    "breed": string, //猫種
    "color": string, //カラー
    "description": string, //説明
    "url": string, //画像URL
}

//里親募集中
export interface AdoptionListType {
    "adoptionCatId": number, //猫番号
    "name": string, //名前
    "sex": string, //性別
    "birthDate": number, //生年月日
    "breed": string, //猫種
    "color": string, //カラー
    "description": string, //説明
    "url": string, //画像URL
}

//ニュース
export interface NewsType {
    "newsId": string, 
    "title": string,
    "content": string,
    "publicationDate": string,
}