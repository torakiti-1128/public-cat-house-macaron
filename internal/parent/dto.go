package parent

// 親猫一覧データ
type ParentCatsDTO struct {
	ParentCatID int    `json:"parentCatId"`
	Name        string `json:"name"`
	Sex         int    `json:"sex"`
	Breed       string `json:"breed"`
	Age         string `json:"age"`
	ImageUrl    string `json:"imageUrl"`
}

// 親猫詳細データ
type ParentCatDetailDTO struct {
	ParentCatID int    `json:"parentCatId"`
	Name        string `json:"name"`
	Sex         int    `json:"sex"`
	Breed       string `json:"breed"`
	Color       string `json:"color"`
	Age         int    `json:"age"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
}
