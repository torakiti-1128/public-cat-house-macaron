package adoption

// 里親募集中猫一覧データ
type AdoptionCatsDTO struct {
	AdoptionCatId int    `json:"adoptionCatId"`
	Name        string `json:"name"`
	Sex         int    `json:"sex"`
	Breed       string `json:"breed"`
	Color       string `json:"color"`
	Age         int    `json:"age"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
}

// 里親募集中猫詳細データ
type AdoptionCatDetailDTO struct {
	AdoptionCatId int    `json:"adoptionCatId"`
	Name        string `json:"name"`
	Sex         int    `json:"sex"`
	Breed       string `json:"breed"`
	Color       string `json:"color"`
	Age         int    `json:"age"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
}

// 里親募集中猫追加データ
type PostAdoptionCatDTO struct {
	BreedId     int    `json:"breedId"`
	ColorId     int    `json:"colorId"`
	Name        string `json:"name"`
	Sex         int    `json:"sex"`
	Age         int    `json:"age"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
}

// 里親募集中猫更新データ
type UpdateAdoptionCatDTO struct {
	AdoptionCatId int    `json:"adoptionCatId"`
	BreedId     int    `json:"breedId"`
	ColorId     int    `json:"color"`
	Name        string `json:"name"`
	Sex         int    `json:"sex"`
	Age         int    `json:"age"`
	BirthDate   string `json:"birthDate"`
	Description string `json:"description"`
}
