package parent

// 親猫一覧データ
type ParentCatsDTO struct {
	ParentCatId int    `json:"parentCatId"`
	Name        string `json:"name"`
	Sex         int    `json:"sex"`
	Breed       string `json:"breed"`
	Age         string `json:"age"`
	ImageUrl    string `json:"imageUrl"`
}

// 親猫詳細データ
type ParentCatDetailDTO struct {
	ParentCatId int    `json:"parentCatId"`
	Name        string `json:"name"`
	Sex         int    `json:"sex"`
	Breed       string `json:"breed"`
	Color       string `json:"color"`
	Age         int    `json:"age"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
}

// 親猫追加データ
type PostParentCatDTO struct {
	BreedId     int    `json:"breedId"`
	ColorId     int    `json:"colorId"`
	Name        string `json:"name"`
	Sex         int    `json:"sex"`
	Age         int    `json:"age"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
}

// 親猫更新データ
type UpdateParentCatDTO struct {
	ParentCatId int    `json:"parentCatId"`
	BreedId     int    `json:"breedId"`
	ColorId     int    `json:"color"`
	Name        string `json:"name"`
	Sex         int    `json:"sex"`
	Age         int    `json:"age"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
}
