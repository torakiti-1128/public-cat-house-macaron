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