package breed

// 猫種データ
type BreedDTO struct {
	BreedId   int    `json:"breedId"`
	BreedName string `json:"breedName"`
}

// 猫種追加データ
type PostBreedDTO struct {
	BreedName string `json:"breedName"`
}

// 猫種更新データ
type UpdateBreedDTO struct {
	BreedId   int    `json:"breedId"`
	BreedName string `json:"breedName"`
}
