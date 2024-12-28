//子猫一覧
export interface KittenListType {
  kittenId: number //お問い合わせ番号
  breed: string //猫種
  imageUrl: string //画像URL
  tranState: string //取引状態
  createdAt: string //更新日時
}

//子猫詳細
export interface KittenDetailType {
  kittenId: number //お問い合わせ番号
  fatherCatId: number //お父さん猫番号
  motherCatId: number //お母さん猫番号
  description: string //説明
  breed: string //猫種
  color: string //カラー
  sex: number
  birthDate: string //生年月日
  price: number //価格
  imageUrls: string[]
  videoUrl: string
}

//子猫の親猫情報
export interface ParentCatKittenDetailType {
  parentCatId: number //親猫番号
  name: string //名前
  sex: number //性別
  breed: string //猫種
  color: string //カラー
  age: string //説明
  birthDate: string //生年月日
  description: string //説明
  imageUrl: string //画像URL
}

//親猫
export interface ParentCatListType {
  parentCatId: number //親猫番号
  name: string //名前
  sex: number //性別
  breed: string //猫種
  color: string //カラー
  age: number //年齢
  birthDate: string //生年月日
  description: string //説明
  imageUrl: string //画像URL
}

//里親募集中
export interface AdoptionListType {
  adoptionCatId: number //猫番号
  name: string //名前
  sex: number //性別
  breed: string //猫種
  color: string //カラー
  age: number //年齢
  birthDate: string //生年月日
  description: string //説明
  imageUrl: string //画像URL
}

//見学希望者の問い合わせ
export interface InquiryType {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  title: string
  message: string
}

//見学希望者の問いわせ
export interface InspectionType {
  address: string
  email: string
  firstName: string
  kittenId: string
  lastName: string
  message: string
  petStatus: string
  phoneNumber: string
  visitDate: string
  visitTime: string
  visitMethod: string
  visitPeople: string
}
