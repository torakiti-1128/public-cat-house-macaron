package color

// カラーデータ
type ColorDTO struct {
	ColorId   int    `json:"colorId"`
	ColorName string `json:"colorName"`
}

// カラー追加データ
type PostColorDTO struct {
	ColorName string `json:"colorName"`
}

// カラー更新データ
type UpdateColorDTO struct {
	ColorId   int    `json:"colorId"`
	ColorName string `json:"colorName"`
}
